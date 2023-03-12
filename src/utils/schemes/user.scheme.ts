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
  @ApiProperty({
    example: 1,
    description: 'User version',
  })
  version!: number;
  @ApiProperty({
    example: 1676882643,
    description: 'Timestamp of creation',
  })
  createdAt!: number;
  @ApiProperty({
    example: 1676882643,
    description: 'Timestamp of update',
  })
  updatedAt!: number;
}

export class UserPassScheme {
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
  @ApiProperty({
    example: 1,
    description: 'User version',
  })
  version!: number;
  @ApiProperty({
    example: 1676882643,
    description: 'Timestamp of creation',
  })
  createdAt!: number;
  @ApiProperty({
    example: 1676882643,
    description: 'Timestamp of update',
  })
  updatedAt!: number;
  @ApiProperty({
    example: 'qwerty',
    description: 'User password',
  })
  password?: string;
}
