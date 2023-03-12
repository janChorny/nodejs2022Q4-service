import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4, validate, version } from 'uuid';
import { CreateTrackDTO } from './dto/trackCreate.dto';
import { UpdateTrackDTO } from './dto/trackUpdate.dto';
import { TrackEntity } from './entities/track.entity';

export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async getAllTracks() {
    const tracks = await this.trackRepository.find();
    return tracks;
  }

  async getTrack(trackId: string) {
    const track = await this.trackRepository.findOneBy({ id: trackId });
    if (track) return track;
    throw new NotFoundException(`Track with id = ${trackId} was not found`);
  }

  async createTrack({ name, duration, artistId, albumId }: CreateTrackDTO) {
    const track = {
      id: v4(),
      name,
      duration,
      artistId,
      albumId,
    };

    const createdTrack = this.trackRepository.create(track);
    return await this.trackRepository.save(createdTrack);
  }

  async updateTrack(trackId: string, updateTrackDTO: UpdateTrackDTO) {
    const { name, artistId, albumId, duration } = updateTrackDTO;
    if (
      typeof name !== 'string' ||
      typeof duration !== 'number' ||
      (validate(artistId) && version(artistId) === 4) ||
      (validate(albumId) && version(albumId) === 4)
    ) {
      throw new HttpException(
        `Not all the provided fields are valid`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const track = await this.trackRepository.findOneBy({ id: trackId });
    if (!track) {
      throw new NotFoundException(`Track with id = ${trackId} was not found`);
    }

    await this.trackRepository.update(trackId, { ...updateTrackDTO });
    return await this.trackRepository.findOneBy({ id: trackId });
  }

  public async deleteTrack(id: string) {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundException(`Track with id = ${id} was not found`);
    }
    await this.trackRepository.delete({ id });
  }
}
