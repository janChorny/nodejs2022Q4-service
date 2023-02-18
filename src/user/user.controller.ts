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

@ApiTags('Users')
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
}
