import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AlbumScheme } from 'src/utils/schemes/album.scheme';
import { ArtistScheme } from 'src/utils/schemes/artist.scheme';
import { FavoriteScheme } from 'src/utils/schemes/favorite.scheme';
import { TrackScheme } from 'src/utils/schemes/track.scheme';
import { FavoriteService } from './favorites.service';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private favoriteService: FavoriteService) {}

  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({ status: HttpStatus.OK, type: [FavoriteScheme] })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllFavorites() {
    return await this.favoriteService.getAllFavorites();
  }

  @ApiOperation({ summary: 'Add track to favorites' })
  @ApiResponse({ status: HttpStatus.CREATED, type: TrackScheme })
  @HttpCode(HttpStatus.CREATED)
  @Post('track/:id')
  async addTrackToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoriteService.addTrackToFavorites(id);
  }

  @ApiOperation({ summary: 'Remove track from favorites' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('track/:id')
  async deleteTrackFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoriteService.deleteTrackFromFavorites(id);
  }

  @ApiOperation({ summary: 'Add album to favorites' })
  @ApiResponse({ status: HttpStatus.CREATED, type: AlbumScheme })
  @HttpCode(HttpStatus.CREATED)
  @Post('album/:id')
  async addAlbumToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoriteService.addAlbumsIdFavorites(id);
  }

  @ApiOperation({ summary: 'Remove album from favorites' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('album/:id')
  async deleteAlbumFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoriteService.deleteAlbumsFromFavorites(id);
  }

  @ApiOperation({ summary: 'Add artist to favorites' })
  @ApiResponse({ status: HttpStatus.CREATED, type: ArtistScheme })
  @HttpCode(HttpStatus.CREATED)
  @Post('artist/:id')
  async addArtistToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoriteService.addArtistToFavorites(id);
  }

  @ApiOperation({ summary: 'Remove artist from favorites' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('artist/:id')
  async deleteArtistFromFavorites(
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.favoriteService.deleteArtistFromFavorites(id);
  }
}
