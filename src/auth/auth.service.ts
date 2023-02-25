import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/user/dto/userCreate.dto';
import { UserService } from 'src/user/user.service';
import { User } from '../utils/models/models';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signUp(userDTO: CreateUserDTO) {
    const candidate = await this.userService.findOne(userDTO.login);
    if (candidate) {
      throw new HttpException(
        `User with login=${userDTO.login} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDTO.password, 10);
    const user = this.userService.create({
      ...userDTO,
      password: hashPassword,
    });
    return await this.generateToken(user);
  }

  async login() {
    console.log();
  }

  async refresh() {
    console.log();
  }

  async generateToken(user: User) {
    const payload = { id: user.id, login: user.login };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
