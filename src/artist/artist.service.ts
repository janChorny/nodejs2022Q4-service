import { Injectable } from '@nestjs/common';
import { dataBase } from 'src/constants/constants';
import { v4 } from 'uuid';
import { CreateArtistDTO } from './dto/artistCreate.dto';
import { UpdateArtistDTO } from './dto/artistUpdate.dto';

@Injectable()
export class ArtistService {
  getAllArtists() {
    return dataBase.artists;
  }

  getArtist(id: string) {
    const artist = dataBase.artists.find((artist) => artist.id === id);
    return artist;
  }

  createArtist({ name, grammy }: CreateArtistDTO) {
    const artist = {
      id: v4(),
      name,
      grammy,
    };

    dataBase.artists.push(artist);
    return artist;
  }

  updateArtist(id: string, updateArtistDTO: UpdateArtistDTO) {
    const artistToUpdateIndex = dataBase.artists.findIndex(
      (artist) => artist.id === id,
    );
    const artistToUpdate = dataBase.artists[artistToUpdateIndex];
    dataBase.artists[artistToUpdateIndex] = {
      ...artistToUpdate,
      ...updateArtistDTO,
    };
    return dataBase.artists[artistToUpdateIndex];
  }

  deleteArtist(id: string) {
    dataBase.artists = dataBase.artists.filter((artist) => artist.id !== id);
    return;
  }
}
