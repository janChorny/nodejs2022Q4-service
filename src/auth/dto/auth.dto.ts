import { IsJWT, IsNotEmpty, IsString } from 'class-validator';

export class AuthDTO {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RefreshTokenDTO {
  @IsString()
  @IsNotEmpty()
  @IsJWT()
  refreshToken: string;
}
