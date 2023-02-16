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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { dataBase } from 'src/constants/constants';
import { TrackService } from 'src/track/track.service';
import { ArtistScheme } from 'src/user/schemes/artist.scheme';
import { ArtistService } from './artist.service';
import { CreateArtistDTO } from './dto/artistCreate.dto';
import { UpdateArtistDTO } from './dto/artistUpdate.dto';

@ApiTags('Artist')
@Controller('artist')
export class ArtistController {
  constructor(
    private artistService: ArtistService,
    private trackService: TrackService,
  ) {}

  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({ status: HttpStatus.OK, type: [ArtistScheme] })
  @HttpCode(HttpStatus.OK)
  @Get()
  getAllArtists() {
    return this.artistService.getAllArtists();
  }

  @ApiOperation({ summary: 'Get artist by id' })
  @ApiResponse({ status: HttpStatus.OK, type: ArtistScheme })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = this.artistService.getArtist(id);
    if (!artist) {
      throw new HttpException(
        `Artist with such id is not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return artist;
  }

  @ApiOperation({ summary: 'Create Artist' })
  @ApiResponse({ status: HttpStatus.CREATED, type: ArtistScheme })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createArtist(@Body() createArtistDTO: CreateArtistDTO) {
    return this.artistService.createArtist(createArtistDTO);
  }

  @ApiOperation({
    summary: 'Update artist by id',
  })
  @ApiResponse({ status: HttpStatus.OK, type: ArtistScheme })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updateArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDTO: UpdateArtistDTO,
  ) {
    const { name, grammy } = updateArtistDTO;
    if (typeof name !== 'string' || typeof grammy !== 'boolean') {
      throw new HttpException(
        `Not all the provided fields are valid`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const artist = this.artistService.getArtist(id);
    if (!artist) {
      throw new HttpException(
        `Artist with such id is not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.artistService.updateArtist(id, updateArtistDTO);
  }

  @ApiOperation({
    summary: 'Delete artist by id',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = this.trackService.getTrackByArtist(id);
    if (track) {
      this.trackService.updateTrack(track.id, {
        artistId: null,
        name: track.name,
        albumId: track.albumId,
        duration: track.duration,
      });
    }
    const artist = this.artistService.getArtist(id);
    if (!artist) {
      throw new HttpException(
        `Artist with such id is not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    dataBase.favorites.artists = dataBase.favorites.artists.filter(
      (artistID) => artistID !== id,
    );
    return this.artistService.deleteArtist(id);
  }
}
