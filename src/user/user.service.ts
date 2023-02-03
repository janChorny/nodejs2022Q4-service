import { Injectable } from '@nestjs/common';
import {
  dataBase,
  showMessageWithStatus,
  StatusCodeMessage,
} from 'src/constants/constants';
import { v4, validate, version } from 'uuid';
import { CreateUserDTO } from './dto/userCreate.dto';
import { UpdatePasswordDTO } from './dto/userUpdate.dto';

@Injectable()
export class UserService {
  getAllUsers() {
    return dataBase.users;
  }

  getUser(id: string) {
    if (validate(id) && version(id) === 4) {
      const user = dataBase.users.find((user) => user.id === id);
      if (user) {
        const result = { ...user };
        delete result.password;
        return result;
      } else {
        throw new Error(
          JSON.stringify(showMessageWithStatus(StatusCodeMessage.noSuchRecord)),
        );
      }
    } else {
      throw new Error(
        JSON.stringify(showMessageWithStatus(StatusCodeMessage.wrongUserId)),
      );
    }
  }

  createUser(createUserDTO: CreateUserDTO) {
    if (!createUserDTO.login && !createUserDTO.password) {
      if (
        typeof createUserDTO.login === 'string' &&
        typeof createUserDTO.password === 'string'
      ) {
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
      } else {
        throw new Error(
          JSON.stringify(
            showMessageWithStatus(StatusCodeMessage.noValidLoginOrPassword),
          ),
        );
      }
    } else {
      throw new Error(
        JSON.stringify(
          showMessageWithStatus(StatusCodeMessage.noRequiredFields),
        ),
      );
    }
  }

  updateUserPassword(id: string, updateUserPasswordDTO: UpdatePasswordDTO) {
    if (!(validate(id) && version(id) == 4)) {
      throw new Error(
        JSON.stringify(showMessageWithStatus(StatusCodeMessage.wrongUserId)),
      );
    }
    if (
      !updateUserPasswordDTO.oldPassword ||
      !updateUserPasswordDTO.newPassword
    ) {
      throw new Error(
        JSON.stringify(
          showMessageWithStatus(StatusCodeMessage.noRequiredFields),
        ),
      );
    }
    if (
      typeof updateUserPasswordDTO.oldPassword !== 'string' ||
      typeof updateUserPasswordDTO !== 'string'
    ) {
      throw new Error(
        JSON.stringify(
          showMessageWithStatus(StatusCodeMessage.noValidPasswordOrOldPassword),
        ),
      );
    }
    const userToUpdateIndex = dataBase.users.findIndex(
      (user) => user.id === id,
    );
    if (userToUpdateIndex === -1) {
      throw new Error(
        JSON.stringify(showMessageWithStatus(StatusCodeMessage.noSuchRecord)),
      );
    }
    const userToUpdate = dataBase.users[userToUpdateIndex];
    if (userToUpdate.password === updateUserPasswordDTO['oldPassword']) {
      dataBase.users[userToUpdateIndex] = {
        ...userToUpdate,
        password: updateUserPasswordDTO['newPassword'],
        version: userToUpdate.version + 1,
        updatedAt: Date.now(),
      };
      const result = { ...dataBase.users[userToUpdateIndex] };
      delete result.password;
      return result;
    } else {
      throw new Error(
        JSON.stringify(
          showMessageWithStatus(StatusCodeMessage.wrongOldPassword),
        ),
      );
    }
  }

  deleteUser(id: string) {
    const result = this.getUser(id);
    if (result) {
      dataBase.users.filter((user) => result.id !== user.id);
      return;
    }
    return;
  }
}
