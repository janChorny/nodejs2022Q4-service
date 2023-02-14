import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/userCreate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(userDTO: CreateUserDTO) {
    const createdUser = this.userRepository.create(userDTO);
    return (await this.userRepository.save(createdUser)).toResponse();
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users.map((user) => user.toResponse());
  }

  async findOne(userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (user) return user.toResponse();
    throw new NotFoundException(`User with id = ${userId} was not found`);
  }

  async update(userId: string, userDto: CreateUserDTO) {
    if (userDto.id) delete userDto.id;
    const updatedUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (userDto.login !== updatedUser.login) {
      await this.isLoginExists(userDto.login);
    }

    if (updatedUser) {
      Object.assign(updatedUser, userDto);
      return await this.userRepository.save(updatedUser);
    }

    throw new NotFoundException(`User with id = ${userId} was not found`);
  }

  async findByLogin(login: string) {
    const user = await this.userRepository.findOne({ where: { login } });
    if (user) return user;
  }

  async isLoginExists(login: string) {
    const user = await this.findByLogin(login);
    if (user)
      throw new BadRequestException(
        `User with login = $login{} already exists`,
      );
  }

  async delete(userId: string) {
    const result = await this.userRepository.delete(userId);

    if (result.affected === 0) {
      throw new NotFoundException(`User with id = ${userId} was not found`);
    }
  }

  // getAllUsers() {
  //   return dataBase.users;
  // }

  // getUser(id: string) {
  //   const user = dataBase.users.find((user) => user.id === id);
  //   return user;
  // }

  // createUser(createUserDTO: CreateUserDTO) {
  //   const user = {
  //     id: v4(),
  //     login: createUserDTO.login,
  //     password: createUserDTO.password,
  //     version: 1,
  //     createdAt: Date.now(),
  //     updatedAt: Date.now(),
  //   };

  //   dataBase.users.push(user);
  //   const result = { ...user };
  //   delete result.password;
  //   return result;
  // }

  // updateUserPassword(id: string, updateUserPasswordDTO: UpdatePasswordDTO) {
  //   const userToUpdateIndex = dataBase.users.findIndex(
  //     (user) => user.id === id,
  //   );
  //   const userToUpdate = dataBase.users[userToUpdateIndex];
  //   dataBase.users[userToUpdateIndex] = {
  //     ...userToUpdate,
  //     password: updateUserPasswordDTO['newPassword'],
  //     version: userToUpdate.version + 1,
  //     updatedAt: Date.now(),
  //   };
  //   const result = { ...dataBase.users[userToUpdateIndex] };
  //   delete result.password;
  //   return result;
  // }

  // deleteUser(id: string) {
  //   dataBase.users = dataBase.users.filter((user) => user.id !== id);
  //   return;
  // }
}
