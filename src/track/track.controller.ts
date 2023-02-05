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
import { validate, version } from 'uuid';
import { CreateTrackDTO } from './dto/trackCreate.dto';
import { UpdateTrackDTO } from './dto/trackUpdate.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getAllTracks() {
    return this.trackService.getAllTracks();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = this.trackService.getTrack(id);
    if (!track) {
      throw new HttpException(
        `Track with such id is not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return track;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createTrack(@Body() createTrackDTO: CreateTrackDTO) {
    return this.trackService.createTrack(createTrackDTO);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updateTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDTO: UpdateTrackDTO,
  ) {
    const { name, artistId, albumId, duration } = updateTrackDTO;
    if (
      typeof name !== 'string' ||
      typeof duration !== 'number' ||
      (validate(artistId) && version(artistId) === 4) ||
      (validate(albumId) && version(albumId))
    ) {
      throw new HttpException(
        `Not all the provided fields are valid`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const track = this.trackService.getTrack(id);
    if (!track) {
      throw new HttpException(
        `Track with such id is not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.trackService.updateTrack(id, updateTrackDTO);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = this.trackService.getTrack(id);
    if (!track) {
      throw new HttpException(
        `Track with such id is not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.trackService.deleteTrack(id);
  }
}
