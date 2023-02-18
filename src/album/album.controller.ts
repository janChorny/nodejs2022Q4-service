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
import { AlbumScheme } from 'src/user/schemes/album.scheme';
import { AlbumService } from './album.service';
import { CreateAlbumDTO } from './dto/albumCreate.dto';
import { UpdateAlbumDTO } from './dto/albumUpdate.dto';

@ApiTags('Albums')
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @ApiOperation({ summary: 'Get all albums' })
  @ApiResponse({ status: HttpStatus.OK, type: [AlbumScheme] })
  @HttpCode(HttpStatus.OK)
  @Get()
  getAllAlbums() {
    return this.albumService.getAllAlbums();
  }

  @ApiOperation({ summary: 'Get album by id' })
  @ApiResponse({ status: HttpStatus.OK, type: AlbumScheme })
  @HttpCode(HttpStatus.OK)
  @Get(':albumId')
  getAlbum(@Param('id', new ParseUUIDPipe()) albumId: string) {
    return this.albumService.getAlbum(albumId);
  }

  @ApiOperation({ summary: 'Create Album' })
  @ApiResponse({ status: HttpStatus.CREATED, type: AlbumScheme })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createAlbum(@Body() createAlbumDTO: CreateAlbumDTO) {
    return this.albumService.createAlbum(createAlbumDTO);
  }

  @ApiOperation({
    summary: 'Update album by id',
  })
  @ApiResponse({ status: HttpStatus.OK, type: AlbumScheme })
  @HttpCode(HttpStatus.OK)
  @Put(':albumId')
  updateAlbum(
    @Param('albumId', new ParseUUIDPipe()) albumId: string,
    @Body() updateAlbumDTO: UpdateAlbumDTO,
  ) {
    return this.albumService.updateAlbum(albumId, updateAlbumDTO);
  }

  @ApiOperation({
    summary: 'Delete album by id',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    // const track = this.trackService.getTrackByAlbum(id);
    // if (track) {
    //   this.trackService.updateTrack(track.id, {
    //     artistId: track.artistId,
    //     name: track.name,
    //     albumId: null,
    //     duration: track.duration,
    //   });
    // }
    // dataBase.favorites.albums = dataBase.favorites.albums.filter(
    //   (albumID) => albumID !== id,
    // );
    return this.albumService.deleteAlbum(id);
  }
}
