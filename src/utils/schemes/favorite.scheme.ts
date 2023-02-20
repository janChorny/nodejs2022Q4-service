import { ApiProperty } from '@nestjs/swagger';
import { AlbumScheme } from './album.scheme';
import { ArtistScheme } from './artist.scheme';
import { TrackScheme } from './track.scheme';

export class FavoriteScheme {
  @ApiProperty({
    example: 'ac6fa66e-5115-4498-aa24-67daacaca2be',
    description: 'Id',
  })
  id?: string;
  @ApiProperty({
    example: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'As above so below',
        duration: 500,
        artistId: '123e4567-e89b-12d3-a456-426614174001',
        albumId: '123e4567-e89b-12d3-a456-426614174001',
      },
    ],
    description: 'Favorite Tracks',
  })
  tracks: TrackScheme[];
  @ApiProperty({
    example: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Zos kia Cultus',
        year: 2002,
        artistId: '123e4567-e89b-12d3-a456-426614174001',
      },
    ],
    description: 'Favorite Albums',
  })
  albums: AlbumScheme[];
  @ApiProperty({
    example: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Behemoth',
        grammy: false,
      },
    ],
    description: 'Favorite Artists',
  })
  artists: ArtistScheme[];
}
