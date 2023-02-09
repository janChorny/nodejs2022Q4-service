import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ example: 'Jerry', description: 'string value' })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({ example: 'qwerty', description: 'string value' })
  @IsString()
  @IsString()
  password: string;
}
