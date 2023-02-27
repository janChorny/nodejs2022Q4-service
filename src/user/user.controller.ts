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
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/userCreate.dto';
import { UpdatePasswordDTO } from './dto/passwordUpdate.dto';
import { UserScheme } from '../utils/schemes/user.scheme';
import { UserService } from './user.service';
import { UserPassScheme } from 'src/utils/schemes/user.scheme';
import { AccessGuard } from 'src/auth/guards/access.guard';

@ApiTags('Users')
@Controller('user')
@UseGuards(AccessGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: HttpStatus.OK, type: [UserScheme] })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: HttpStatus.OK, type: UserPassScheme })
  @HttpCode(HttpStatus.OK)
  @Get(':userId')
  async getUser(@Param('userId', new ParseUUIDPipe()) userId: string) {
    return await this.userService.findOne(userId);
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: HttpStatus.CREATED, type: UserScheme })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    return await this.userService.create(createUserDTO);
  }

  @ApiOperation({
    summary: 'Update user by id',
  })
  @ApiResponse({ status: HttpStatus.OK, type: UserScheme })
  @HttpCode(HttpStatus.OK)
  @Put(':userId')
  async updateUserPassword(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Body() updateUserPasswordDTO: UpdatePasswordDTO,
  ) {
    return await this.userService.update(userId, updateUserPasswordDTO);
  }

  @ApiOperation({
    summary: 'Delete user by id',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':userId')
  async deleteUser(@Param('userId', new ParseUUIDPipe()) userId: string) {
    return await this.userService.delete(userId);
  }
}
