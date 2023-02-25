import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/utils/models/models';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'SignUp' })
  @ApiResponse({ status: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async singUp(@Body() user: User) {
    return await this.authService.signUp(user);
  }

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: HttpStatus.CREATED })
  @HttpCode(HttpStatus.CREATED)
  @Post('login')
  async login() {
    return await this.authService.login();
  }

  @ApiOperation({ summary: 'Refresh token' })
  @ApiResponse({ status: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh() {
    return await this.authService.refresh();
  }
}
