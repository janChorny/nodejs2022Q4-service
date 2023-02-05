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
    const index = dataBase.favorites.tracks.findIndex(
      (trackId) => trackId === id,
    );
    const trackToDelete = dataBase.favorites.tracks[index];
    dataBase.favorites.tracks.filter((track) => track !== trackToDelete);
    // return trackToDelete;
  }

  deleteArtistIdFromFavorites(id: string) {
    const index = dataBase.favorites.artists.findIndex(
      (artistId) => artistId === id,
    );
    const artistToDelete = dataBase.favorites.artists[index];
    dataBase.favorites.artists.filter((artist) => artist !== artistToDelete);
    // return artistToDelete;
  }

  deleteAlbumsIdFromFavorites(id: string) {
    const index = dataBase.favorites.albums.findIndex(
      (albumId) => albumId === id,
    );
    const albumToDelete = dataBase.favorites.albums[index];
    dataBase.favorites.albums.filter((album) => album !== albumToDelete);
    // return albumToDelete;
  }
}
