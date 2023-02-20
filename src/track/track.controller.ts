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
import { TrackScheme } from 'src/utils/schemes/track.scheme';
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
  async getAllTracks() {
    return await this.trackService.getAllTracks();
  }

  @ApiOperation({ summary: 'Get track by id' })
  @ApiResponse({ status: HttpStatus.OK, type: TrackScheme })
  @HttpCode(HttpStatus.OK)
  @Get(':trackId')
  async getTrack(@Param('trackId', new ParseUUIDPipe()) trackId: string) {
    return await this.trackService.getTrack(trackId);
  }

  @ApiOperation({ summary: 'Create Track' })
  @ApiResponse({ status: HttpStatus.CREATED, type: TrackScheme })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createTrack(@Body() createTrackDTO: CreateTrackDTO) {
    return await this.trackService.createTrack(createTrackDTO);
  }

  @ApiOperation({
    summary: 'Update track by id',
  })
  @ApiResponse({ status: HttpStatus.OK, type: TrackScheme })
  @HttpCode(HttpStatus.OK)
  @Put(':trackId')
  async updateTrack(
    @Param('trackId', new ParseUUIDPipe()) trackId: string,
    @Body() updateTrackDTO: UpdateTrackDTO,
  ) {
    return await this.trackService.updateTrack(trackId, updateTrackDTO);
  }

  @ApiOperation({
    summary: 'Delete track by id',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.trackService.deleteTrack(id);
  }
}
