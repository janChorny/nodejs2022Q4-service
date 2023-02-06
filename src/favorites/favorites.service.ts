import { Injectable } from '@nestjs/common';
import { dataBase } from 'src/constants/constants';

@Injectable()
export class FavoriteService {
  addTrackIdToFavorites(id: string) {
    dataBase.favorites.tracks.push(id);
  }

  addArtistIdToFavorites(id: string) {
    dataBase.favorites.artists.push(id);
  }

  addAlbumsIdFavorites(id: string) {
    dataBase.favorites.albums.push(id);
  }

  deleteTrackIdFromFavorites(id: string) {
    // // return trackToDelete;
    dataBase.favorites.tracks = dataBase.favorites.tracks.filter(
      (trackID) => trackID !== id,
    );
    return;
  }

  deleteArtistIdFromFavorites(id: string) {
    dataBase.favorites.artists = dataBase.favorites.artists.filter(
      (artistID) => artistID !== id,
    );
    return;
  }

  deleteAlbumsIdFromFavorites(id: string) {
    dataBase.favorites.albums = dataBase.favorites.albums.filter(
      (albumsID) => albumsID !== id,
    );
    return;
  }
}
