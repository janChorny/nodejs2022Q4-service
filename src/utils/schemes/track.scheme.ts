import { ApiProperty } from '@nestjs/swagger';

export class TrackScheme {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'TrackId as UUID',
  })
  id: string;
  @ApiProperty({
    example: 'Innuendo',
    description: 'Track name',
  })
  name!: string;
  @ApiProperty({
    example: 500,
    description: 'Track duration in seconds',
  })
  duration!: number;
  @ApiProperty({
    example: null,
    description: 'Artist (string or null by default)',
  })
  artistId: string | null;
  @ApiProperty({
    example: null,
    description: 'Album Id (string or null by default)',
  })
  albumId: string | null;
}
