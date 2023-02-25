import { ApiProperty } from '@nestjs/swagger';

export class AuthScheme {
  @ApiProperty({
    example: 'Vasia',
    description: 'Unique user login',
  })
  login: string;
  @ApiProperty({
    example: 'qwerty',
    description: 'User password',
  })
  password: string;
}
