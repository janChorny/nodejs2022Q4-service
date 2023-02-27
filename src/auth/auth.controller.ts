import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/user/dto/userCreate.dto';
import { AuthScheme } from 'src/utils/schemes/auth.scheme';
import { UserPassScheme } from 'src/utils/schemes/user.scheme';
import { AuthService } from './auth.service';
import { RefreshTokenDTO } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'SignUp' })
  @ApiResponse({ status: HttpStatus.CREATED, type: UserPassScheme })
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async singUp(@Body() userDTO: CreateUserDTO) {
    return await this.authService.signUp(userDTO);
  }

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: HttpStatus.OK, type: AuthScheme })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() userDTO: CreateUserDTO) {
    return await this.authService.login(userDTO);
  }

  @ApiOperation({ summary: 'Refresh token' })
  @ApiResponse({ status: HttpStatus.OK, type: AuthScheme })
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Body(new ValidationPipe()) tokenDTO: RefreshTokenDTO) {
    return await this.authService.refresh(tokenDTO);
  }
}
