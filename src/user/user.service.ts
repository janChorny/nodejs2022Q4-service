import { Injectable } from '@nestjs/common';
import { dataBase } from 'src/constants/constants';
import { v4 } from 'uuid';
import { CreateUserDTO } from './dto/userCreate.dto';
import { UpdatePasswordDTO } from './dto/userUpdate.dto';

@Injectable()
export class UserService {
  getAllUsers() {
    return dataBase.users;
  }

  getUser(id: string) {
    const user = dataBase.users.find((user) => user.id === id);
    return user;
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

  updateUserPassword(id: string, updateUserPasswordDTO: UpdatePasswordDTO) {
    const userToUpdateIndex = dataBase.users.findIndex(
      (user) => user.id === id,
    );
    const userToUpdate = dataBase.users[userToUpdateIndex];
    dataBase.users[userToUpdateIndex] = {
      ...userToUpdate,
      password: updateUserPasswordDTO['newPassword'],
      version: userToUpdate.version + 1,
      updatedAt: Date.now(),
    };
    const result = { ...dataBase.users[userToUpdateIndex] };
    delete result.password;
    return result;
  }

  deleteUser(id: string) {
    dataBase.users = dataBase.users.filter((user) => user.id !== id);
    return;
  }
}
