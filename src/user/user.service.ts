import { Injectable } from '@nestjs/common';
import { dataBase } from 'src/constants/constants';
import { v4 } from 'uuid';
import { CreateUserDTO } from './dto/userCreate.dto';

@Injectable()
export class UserService {
  getAllUsers() {
    return dataBase.users;
  }

  createUser(createUserDTO: CreateUserDTO) {
    const user = {
      id: v4(),
      login: createUserDTO.login,
      password: createUserDTO.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    dataBase.users.push(user);
    const result = { ...user };
    delete result.password;
    return result;
  }
}
