import { Module } from '@nestjs/common';
import { TrackService } from 'src/track/track.service';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  imports: [],
  controllers: [AlbumController],
  providers: [AlbumService, TrackService],
})
export class AlbumModule {}
