import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/userCreate.dto';
import { UpdatePasswordDTO } from './dto/userUpdate.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getUser(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = this.userService.getUser(id);
    if (!user) {
      throw new HttpException(
        `User with such id is not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 200, type: CreateUserDTO })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createUser(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.createUser(createUserDTO);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updateUserPassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserPasswordDTO: UpdatePasswordDTO,
  ) {
    const { oldPassword, newPassword } = updateUserPasswordDTO;
    if (!oldPassword && !newPassword) {
      throw new HttpException(
        `Not all the required fields are provided`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = this.userService.getUser(id);
    if (!user) {
      throw new HttpException(
        `User with such id is not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (user.password !== oldPassword) {
      throw new HttpException(
        `Old user's password is wrong`,
        HttpStatus.FORBIDDEN,
      );
    }

    return this.userService.updateUserPassword(id, updateUserPasswordDTO);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = this.userService.getUser(id);
    if (!user) {
      throw new HttpException(
        `User with such id is not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.userService.deleteUser(id);
  }
}
