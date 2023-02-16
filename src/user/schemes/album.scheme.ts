import { ApiProperty } from '@nestjs/swagger';

export class AlbumScheme {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'AlbumId as UUID',
  })
  id: string;
  @ApiProperty({
    example: 'Innuendo',
    description: 'Album name',
  })
  name!: string;
  @ApiProperty({
    example: '1991',
    description: 'Album year',
  })
  year!: number;
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Artist Id',
  })
  artistId: string | null;
}
