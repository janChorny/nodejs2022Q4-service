import { ApiProperty } from '@nestjs/swagger';

export class FavoriteScheme {
  @ApiProperty({
    example: 'Queen, Behemoth',
    description: 'Favorite Artists',
  })
  artists: string;
  @ApiProperty({
    example: 'Innuendo, Zos Kia Cultus',
    description: 'Favorite Albums',
  })
  albums: string;
  @ApiProperty({
    example: 'Innuendo, As above so below',
    description: 'Favorite Tracks',
  })
  tracks: string;
}
