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
import { ArtistScheme } from 'src/user/schemes/artist.scheme';
import { ArtistService } from './artist.service';
import { CreateArtistDTO } from './dto/artistCreate.dto';
import { UpdateArtistDTO } from './dto/artistUpdate.dto';

@ApiTags('Artists')
@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

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
  @Get(':artistId')
  getArtist(@Param('artistId', new ParseUUIDPipe()) artistId: string) {
    return this.artistService.getArtist(artistId);
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
  @Put(':artistId')
  updateArtist(
    @Param('artistId', new ParseUUIDPipe()) artistId: string,
    @Body() updateArtistDTO: UpdateArtistDTO,
  ) {
    return this.artistService.updateArtist(artistId, updateArtistDTO);
  }

  @ApiOperation({
    summary: 'Delete artist by id',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    // const track = this.trackService.getTrackByArtist(id);
    // if (track) {
    //   this.trackService.updateTrack(track.id, {
    //     artistId: null,
    //     name: track.name,
    //     albumId: track.albumId,
    //     duration: track.duration,
    //   });
    // }
    // dataBase.favorites.artists = dataBase.favorites.artists.filter(
    //   (artistID) => artistID !== id,
    // );
    return this.artistService.deleteArtist(id);
  }
}
