import { Module } from '@nestjs/common';
import { TrackService } from 'src/track/track.service';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  imports: [],
  controllers: [ArtistController],
  providers: [ArtistService, TrackService],
})
export class ArtistModule {}
