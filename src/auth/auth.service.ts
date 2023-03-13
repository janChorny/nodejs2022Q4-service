import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/user/dto/userCreate.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { RefreshTokenDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(userDTO: CreateUserDTO) {
    return this.usersRepository.save(userDTO);
  }

  async login(userDTO: CreateUserDTO) {
    const user = await this.usersRepository.findOne({
      where: { login: userDTO.login },
    });
    if (!user) throw new NotFoundException(`User not found`);

    const passwordCheck = this.checkPassword(userDTO.password, user.password);
    if (!passwordCheck) throw new BadRequestException(`Wrong password`);

    const tokens = this.generateToken(user.id, user.login);
    return tokens;
  }

  async refresh(tokenDTO: RefreshTokenDTO) {
    const user = await this.jwtService.verifyAsync<UserEntity>(
      tokenDTO.refreshToken,
    );
    if (!user) throw new ForbiddenException();
    return await this.generateToken(user.id, user.login);
  }

  async generateToken(id: string, login: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { id, login },
        { expiresIn: process.env.TOKEN_EXPIRE_TIME },
      ),
      this.jwtService.signAsync(
        { id, login },
        { expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME },
      ),
    ]);
    const tokens = { accessToken, refreshToken };
    return tokens;
  }

  async checkPassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}
