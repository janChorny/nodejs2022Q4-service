import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsString()
  @IsString()
  password: string;
}
