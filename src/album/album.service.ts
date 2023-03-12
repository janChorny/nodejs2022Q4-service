import { Injectable } from '@nestjs/common';
import { dataBase } from 'src/constants/constants';
import { v4 } from 'uuid';
import { CreateAlbumDTO } from './dto/albumCreate.dto';
import { UpdateAlbumDTO } from './dto/albumUpdate.dto';

@Injectable()
export class AlbumService {
  getAllAlbums() {
    return dataBase.albums;
  }

  getAlbum(id: string) {
    const album = dataBase.albums.find((album) => album.id === id);
    return album;
  }

  createAlbum({ name, year, artistId }: CreateAlbumDTO) {
    const album = {
      id: v4(),
      name,
      year,
      artistId,
    };

    dataBase.albums.push(album);
    return album;
  }

  updateAlbum(id: string, updateAlbumDTO: UpdateAlbumDTO) {
    const albumToUpdateIndex = dataBase.albums.findIndex(
      (album) => album.id === id,
    );
    const albumToUpdate = dataBase.albums[albumToUpdateIndex];
    dataBase.albums[albumToUpdateIndex] = {
      ...albumToUpdate,
      ...updateAlbumDTO,
    };
    return dataBase.albums[albumToUpdateIndex];
  }

  deleteAlbum(id: string) {
    dataBase.albums = dataBase.albums.filter((album) => album.id !== id);
    return;
  }
}
