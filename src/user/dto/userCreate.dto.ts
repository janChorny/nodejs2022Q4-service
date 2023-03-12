import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ example: 'Jerry', description: 'string value' })
  @IsNotEmpty({ message: 'The user login can not be empty' })
  @IsString({ message: 'The user login should be string' })
  login: string;

  @ApiProperty({ example: 'qwerty', description: 'string value' })
  @IsNotEmpty({ message: 'The user password can not be empty' })
  @IsString({ message: 'The user password should be string' })
  password: string;
}
