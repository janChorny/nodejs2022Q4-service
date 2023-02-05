import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from './album.service';
import { CreateAlbumDTO } from './dto/albumCreate.dto';
import { UpdateAlbumDTO } from './dto/albumUpdate.dto';

@Controller('album')
export class AlbumController {
  constructor(
    private albumService: AlbumService,
    private trackService: TrackService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getAllAlbums() {
    return this.albumService.getAllAlbums();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = this.albumService.getAlbum(id);
    if (!album) {
      throw new HttpException(
        `Album with such id is not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return album;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createAlbum(@Body() createAlbumDTO: CreateAlbumDTO) {
    return this.albumService.createAlbum(createAlbumDTO);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updateAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDTO: UpdateAlbumDTO,
  ) {
    const { name, year } = updateAlbumDTO;
    if (typeof name !== 'string' || typeof year !== 'number') {
      throw new HttpException(
        `Not all the provided fields are valid`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const album = this.albumService.getAlbum(id);
    if (!album) {
      throw new HttpException(
        `Album with such id is not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.albumService.updateAlbum(id, updateAlbumDTO);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = this.trackService.getTrackByAlbum(id);
    if (track) {
      this.trackService.updateTrack(track.id, {
        artistId: track.artistId,
        name: track.name,
        albumId: null,
        duration: track.duration,
      });
    }
    const album = this.albumService.getAlbum(id);
    if (!album) {
      throw new HttpException(
        `Album with such id is not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.albumService.deleteAlbum(id);
  }
}
