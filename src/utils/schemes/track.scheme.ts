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
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Artist Id',
  })
  artistId: string | null;
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Album Id',
  })
  albumId: string | null;
  @ApiProperty({
    example: '1:00',
    description: 'Track duration',
  })
  duration!: number;
}
