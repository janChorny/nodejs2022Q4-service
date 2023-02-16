import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { CreateAlbumDTO } from './dto/albumCreate.dto';
import { UpdateAlbumDTO } from './dto/albumUpdate.dto';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  async getAllAlbums() {
    const albums = await this.albumRepository.find();
    return albums;
  }

  async getAlbum(albumId: string) {
    const album = await this.albumRepository.findOneBy({ id: albumId });
    if (album) return album;
    throw new NotFoundException(`Album with id = ${albumId} was not found`);
  }

  async createAlbum({ name, year, artistId }: CreateAlbumDTO) {
    const album = {
      id: v4(),
      name,
      year,
      artistId,
    };

    const createdAlbum = this.albumRepository.create(album);

    return await this.albumRepository.save(createdAlbum);
  }

  async updateAlbum(albumId: string, updateAlbumDTO: UpdateAlbumDTO) {
    const { name, year } = updateAlbumDTO;
    if (typeof name !== 'string' || typeof year !== 'number') {
      throw new HttpException(
        `Not all the provided fields are valid`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const artist = await this.albumRepository.findOneBy({ id: albumId });
    if (!artist) {
      throw new NotFoundException(`Album with id = ${albumId} was not found`);
    }

    await this.albumRepository.update(albumId, { ...updateAlbumDTO });

    return await this.albumRepository.findOneBy({ id: albumId });
  }

  async deleteAlbum(id: string) {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundException(`Album with id = ${id} was not found`);
    }
    await this.albumRepository.delete({ id });
  }
}
