import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { CreateArtistDTO } from './dto/artistCreate.dto';
import { UpdateArtistDTO } from './dto/artistUpdate.dto';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async getAllArtists() {
    const artists = await this.artistRepository.find();
    return artists;
  }

  async getArtist(artistId: string) {
    const artist = await this.artistRepository.findOneBy({ id: artistId });
    if (artist) return artist;
    throw new NotFoundException(`Artist with id = ${artistId} was not found`);
  }

  async createArtist({ name, grammy }: CreateArtistDTO) {
    const artist = {
      id: v4(),
      name,
      grammy,
    };

    const createdArtist = this.artistRepository.create(artist);

    return await this.artistRepository.save(createdArtist);
  }

  async updateArtist(artistId: string, updateArtistDTO: UpdateArtistDTO) {
    const artist = await this.artistRepository.findOneBy({ id: artistId });
    if (!artist) {
      throw new NotFoundException(`Artist with id = ${artistId} was not found`);
    }

    await this.artistRepository.update(artistId, { ...updateArtistDTO });

    return await this.artistRepository.findOneBy({ id: artistId });
  }

  async deleteArtist(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new NotFoundException(`Artist with id = ${id} was not found`);
    }
    await this.artistRepository.delete({ id });
  }
}
