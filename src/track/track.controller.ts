import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrackScheme } from 'src/user/schemes/track.scheme';
import { CreateTrackDTO } from './dto/trackCreate.dto';
import { UpdateTrackDTO } from './dto/trackUpdate.dto';
import { TrackService } from './track.service';

@ApiTags('Tracks')
@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({ status: HttpStatus.OK, type: [TrackScheme] })
  @HttpCode(HttpStatus.OK)
  @Get()
  getAllTracks() {
    return this.trackService.getAllTracks();
  }

  @ApiOperation({ summary: 'Get track by id' })
  @ApiResponse({ status: HttpStatus.OK, type: TrackScheme })
  @HttpCode(HttpStatus.OK)
  @Get(':trackId')
  getTrack(@Param('trackId', new ParseUUIDPipe()) trackId: string) {
    return this.trackService.getTrack(trackId);
  }

  @ApiOperation({ summary: 'Create Artist' })
  @ApiResponse({ status: HttpStatus.CREATED, type: TrackScheme })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createTrack(@Body() createTrackDTO: CreateTrackDTO) {
    return this.trackService.createTrack(createTrackDTO);
  }

  @ApiOperation({
    summary: 'Update track by id',
  })
  @ApiResponse({ status: HttpStatus.OK, type: TrackScheme })
  @HttpCode(HttpStatus.OK)
  @Put(':trackId')
  updateTrack(
    @Param('trackId', new ParseUUIDPipe()) trackId: string,
    @Body() updateTrackDTO: UpdateTrackDTO,
  ) {
    return this.trackService.updateTrack(trackId, updateTrackDTO);
  }

  @ApiOperation({
    summary: 'Delete track by id',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    // const track = this.trackService.getTrack(id);
    // if (!track) {
    //   throw new HttpException(
    //     `Track with such id is not found`,
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
    // dataBase.favorites.tracks = dataBase.favorites.tracks.filter(
    //   (trackID) => trackID !== id,
    // );
    return this.trackService.deleteTrack(id);
  }
}
