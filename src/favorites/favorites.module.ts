import { Module } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { FavoritesController } from './favorites.controller';
import { FavoriteService } from './favorites.service';

@Module({
  imports: [],
  controllers: [FavoritesController],
  providers: [ArtistService, AlbumService, TrackService, FavoriteService],
})
export class FavoritesModule {}
