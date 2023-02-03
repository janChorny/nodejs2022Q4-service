import { IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator/types/decorator/decorators';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
