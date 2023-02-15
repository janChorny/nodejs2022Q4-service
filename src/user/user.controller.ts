import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/userCreate.dto';
import { UpdatePasswordDTO } from './dto/userUpdate.dto';
import { UserScheme } from './schemes/user.scheme';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: HttpStatus.OK, type: [UserScheme] })
  @HttpCode(HttpStatus.OK)
  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: HttpStatus.OK, type: UserScheme })
  @HttpCode(HttpStatus.OK)
  @Get(':userId')
  getUser(@Param('userId', new ParseUUIDPipe()) userId: string) {
    return this.userService.findOne(userId);
  }

  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: HttpStatus.CREATED, type: UserScheme })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createUser(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.create(createUserDTO);
  }

  @ApiOperation({
    summary: 'Update user by id',
  })
  @ApiResponse({ status: HttpStatus.OK, type: UserScheme })
  @HttpCode(HttpStatus.OK)
  @Put(':userId')
  updateUserPassword(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Body() updateUserPasswordDTO: UpdatePasswordDTO,
  ) {
    return this.userService.update(userId, updateUserPasswordDTO);
  }

  @ApiOperation({
    summary: 'Delete user by id',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':userId')
  deleteUser(@Param('userId', new ParseUUIDPipe()) userId: string) {
    return this.userService.delete(userId);
  }

  // @HttpCode(HttpStatus.OK)
  // @Get()
  // getAllUsers() {
  //   return this.userService.getAllUsers();
  // }

  // @HttpCode(HttpStatus.OK)
  // @Get(':id')
  // getUser(@Param('id', new ParseUUIDPipe()) id: string) {
  //   const user = this.userService.getUser(id);
  //   if (!user) {
  //     throw new HttpException(
  //       `User with such id is not found`,
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }
  //   return user;
  // }

  // @HttpCode(HttpStatus.CREATED)
  // @Post()
  // createUser(@Body() createUserDTO: CreateUserDTO) {
  //   return this.userService.createUser(createUserDTO);
  // }

  // @HttpCode(HttpStatus.OK)
  // @Put(':id')
  // updateUserPassword(
  //   @Param('id', new ParseUUIDPipe()) id: string,
  //   @Body() updateUserPasswordDTO: UpdatePasswordDTO,
  // ) {
  //   const { oldPassword, newPassword } = updateUserPasswordDTO;
  //   if (!oldPassword && !newPassword) {
  //     throw new HttpException(
  //       `Not all the required fields are provided`,
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }

  //   const user = this.userService.getUser(id);
  //   if (!user) {
  //     throw new HttpException(
  //       `User with such id is not found`,
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }

  //   if (user.password !== oldPassword) {
  //     throw new HttpException(
  //       `Old user's password is wrong`,
  //       HttpStatus.FORBIDDEN,
  //     );
  //   }

  //   return this.userService.updateUserPassword(id, updateUserPasswordDTO);
  // }

  // @HttpCode(HttpStatus.NO_CONTENT)
  // @Delete(':id')
  // deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
  //   const user = this.userService.getUser(id);
  //   if (!user) {
  //     throw new HttpException(
  //       `User with such id is not found`,
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }
  //   return this.userService.deleteUser(id);
  // }
}
