import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { dataBase } from 'src/constants/constants';
import { TrackService } from 'src/track/track.service';
import { FavoriteService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(
    private artistService: ArtistService,
    private trackService: TrackService,
    private albumService: AlbumService,
    private favoriteService: FavoriteService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getAllFavorites() {
    const favoriteArtists = dataBase.favorites.artists.map((id) =>
      this.artistService.getArtist(id),
    );
    const favoriteAlbums = dataBase.favorites.albums.map((id) =>
      this.albumService.getAlbum(id),
    );
    const favoriteTracks = dataBase.favorites.tracks.map((id) =>
      this.trackService.getTrack(id),
    );
    return {
      artists: favoriteArtists,
      albums: favoriteAlbums,
      tracks: favoriteTracks,
    };
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('track/:id')
  addTrackToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = this.trackService.getTrack(id);
    if (!track) {
      throw new HttpException(
        `Track with such id doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.favoriteService.addTrackIdToFavorites(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('track/:id')
  deleteTrackFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    const favoriteTrack = dataBase.favorites.tracks.find(
      (trackID) => trackID === id,
    );
    if (!favoriteTrack) {
      throw new HttpException(
        `This is a not favorite track`,
        HttpStatus.NOT_FOUND,
      );
    }
    dataBase.favorites.tracks.filter((tracksID) => tracksID !== id);
    // this.favoriteService.deleteTrackIdFromFavorites(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('album/:id')
  addAlbumToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = this.albumService.getAlbum(id);
    if (!album) {
      throw new HttpException(
        `Album with such id doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.favoriteService.addAlbumsIdFavorites(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('album/:id')
  deleteAlbumFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    const favoriteAlbum = dataBase.favorites.albums.find(
      (albumID) => albumID === id,
    );
    if (!favoriteAlbum) {
      throw new HttpException(
        `This is a not favorite album`,
        HttpStatus.NOT_FOUND,
      );
    }
    dataBase.favorites.albums.filter((albumsID) => albumsID !== id);
    // this.favoriteService.deleteAlbumsIdFromFavorites(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('artist/:id')
  addArtistToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = this.artistService.getArtist(id);
    if (!artist) {
      throw new HttpException(
        `Album with such id doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.favoriteService.addArtistIdToFavorites(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('artist/:id')
  deleteArtistFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    const favoriteArtist = dataBase.favorites.artists.find(
      (artistID) => artistID === id,
    );
    if (!favoriteArtist) {
      throw new HttpException(
        `This is a not favorite album`,
        HttpStatus.NOT_FOUND,
      );
    }
    dataBase.favorites.artists.filter((artistID) => artistID !== id);
    // this.favoriteService.deleteArtistIdFromFavorites(id);
  }
}
