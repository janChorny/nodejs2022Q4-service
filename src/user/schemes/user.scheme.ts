import { ApiProperty } from '@nestjs/swagger';

export class UserScheme {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'UserId as UUID',
  })
  id: string;
  @ApiProperty({
    example: 'Vasia',
    description: 'Unique user login',
  })
  login!: string;
}
