import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

dotenv.config();

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || `SECRET`,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
