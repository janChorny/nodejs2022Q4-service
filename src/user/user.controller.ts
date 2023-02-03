import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/userCreate.dto';
import { UpdatePasswordDTO } from './dto/userUpdate.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.createUser(createUserDTO);
  }

  @Put(':id')
  updateUserPassword(
    @Param('id') id: string,
    @Body() updateUserPasswordDTO: UpdatePasswordDTO,
  ) {
    return this.userService.updateUserPassword(id, updateUserPasswordDTO);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string) {
    return this.deleteUser(id);
  }
}
