import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDTO {
  @ApiProperty({ example: 'qwerty', description: 'string value' })
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @ApiProperty({ example: 'password', description: 'string value' })
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
