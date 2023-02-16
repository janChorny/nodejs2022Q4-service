import { ApiProperty } from '@nestjs/swagger';

export class ArtistScheme {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ArtistId as UUID',
  })
  id: string;
  @ApiProperty({
    example: 'Vasia',
    description: 'Unique artist name',
  })
  name!: string;
  @ApiProperty({
    example: 'Yes',
    description: 'Has an artist grammy or not',
  })
  grammy!: boolean;
}
