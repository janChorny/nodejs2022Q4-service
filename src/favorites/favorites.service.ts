import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { Repository } from 'typeorm';
import { FavoriteEntity } from './entities/favorite.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(FavoriteEntity)
    private favoritesRepository: Repository<FavoriteEntity>,
    @InjectRepository(ArtistEntity)
    private artistsRepository: Repository<ArtistEntity>,
    @InjectRepository(AlbumEntity)
    private albumsRepository: Repository<AlbumEntity>,
    @InjectRepository(TrackEntity)
    private readonly tracksRepository: Repository<TrackEntity>,
  ) {}

  async getAllFavorites() {
    const favorites = await this.favoritesRepository.find({
      relations: {
        tracks: true,
        albums: true,
        artists: true,
      },
    });
    if (favorites.length === 0) {
      const newFavorites = await this.favoritesRepository.save({
        tracks: [],
        albums: [],
        artists: [],
      });
      return newFavorites;
    }
    return favorites[0];
  }

  async addTrackToFavorites(trackId: string) {
    const track = await this.tracksRepository.findOneBy({ id: trackId });
    if (!track) {
      throw new HttpException(
        `Track with such id doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const favorites = await this.getAllFavorites();
    favorites.tracks.push(track);
    await this.favoritesRepository.save(favorites);
    return track;
  }

  async addArtistToFavorites(artistId: string) {
    const artist = await this.artistsRepository.findOneBy({ id: artistId });
    if (!artist) {
      throw new HttpException(
        `Artist with such id doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const favorites = await this.getAllFavorites();
    favorites.artists.push(artist);
    await this.favoritesRepository.save(favorites);
    return artist;
  }

  async addAlbumsIdFavorites(albumId: string) {
    const album = await this.albumsRepository.findOneBy({ id: albumId });
    if (!album) {
      throw new HttpException(
        `Album with such id doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const favorites = await this.getAllFavorites();
    favorites.albums.push(album);
    await this.favoritesRepository.save(favorites);
    return album;
  }

  async deleteTrackFromFavorites(trackId: string) {
    const favorites = await this.getAllFavorites();
    const trackInd = favorites.tracks.findIndex(
      (track) => track.id === trackId,
    );
    if (trackInd === -1) {
      throw new NotFoundException(`Track with id = ${trackId} was not found`);
    }
    favorites.tracks = favorites.tracks.filter((track) => track.id !== trackId);
    await this.favoritesRepository.save(favorites);
  }

  async deleteArtistFromFavorites(artistId: string) {
    const favorites = await this.getAllFavorites();
    const artistInd = favorites.artists.findIndex(
      (artist) => artist.id === artistId,
    );
    if (artistInd === -1) {
      throw new NotFoundException(`Artist with id = ${artistId} was not found`);
    }
    favorites.artists = favorites.artists.filter(
      (artist) => artist.id !== artistId,
    );
    await this.favoritesRepository.save(favorites);
  }

  async deleteAlbumsFromFavorites(albumId: string) {
    const favorites = await this.getAllFavorites();
    const albumInd = favorites.albums.findIndex(
      (artist) => artist.id === albumId,
    );
    if (albumInd === -1) {
      throw new NotFoundException(`Album with id = ${albumId} was not found`);
    }
    favorites.albums = favorites.albums.filter((album) => album.id !== albumId);
    await this.favoritesRepository.save(favorites);
  }
}
