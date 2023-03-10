import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/userCreate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import {
  ForbiddenException,
  HttpException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { v4 } from 'uuid';
import { UpdatePasswordDTO } from './dto/passwordUpdate.dto';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(userDTO: CreateUserDTO) {
    userDTO.password = await hash(
      userDTO.password,
      Number(process.env.CRYPT_SALT),
    );
    const createdUser = this.userRepository.create({ ...userDTO, id: v4() });
    await this.userRepository.save(createdUser);
    const result = { ...createdUser };
    delete result.password;
    return result;
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users.map((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    });
  }

  async findOne(userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (user) {
      return user;
    }
    throw new NotFoundException(`User with id = ${userId} was not found`);
  }

  async update(userId: string, userPasswordDto: UpdatePasswordDTO) {
    const { oldPassword, newPassword } = userPasswordDto;
    if (!oldPassword && !newPassword) {
      throw new HttpException(
        `Not all the required fields are provided`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const userToUpdate = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!userToUpdate) {
      throw new HttpException(
        `User with id = ${userId} was not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const checkPass = await compare(
      userPasswordDto.oldPassword,
      userToUpdate.password,
    );

    if (!checkPass) {
      throw new ForbiddenException('Wrong password');
    }

    userPasswordDto.newPassword = await hash(
      userPasswordDto.newPassword,
      Number(process.env.CRYPT_SALT),
    );

    await this.userRepository.update(userId, {
      password: userPasswordDto.newPassword,
      version: userToUpdate.version + 1,
      updatedAt: Math.floor(Date.now() / 1000),
    });

    const updatedUser = await this.userRepository.findOne({
      where: { id: userId },
    });
    const result = { ...updatedUser };
    delete result.password;
    return result;
  }

  async delete(userId: string) {
    const result = await this.userRepository.delete(userId);

    if (result.affected === 0) {
      throw new NotFoundException(`User with id = ${userId} was not found`);
    }
  }
}
