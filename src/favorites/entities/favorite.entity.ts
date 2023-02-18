import { Exclude } from 'class-transformer';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Favorites')
export class FavoriteEntity {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @JoinTable()
  @ManyToMany(() => ArtistEntity, { onDelete: 'CASCADE', eager: true })
  artists: ArtistEntity[];

  @JoinTable()
  @ManyToMany(() => AlbumEntity, { onDelete: 'CASCADE', eager: true })
  albums: AlbumEntity[];

  @JoinTable()
  @ManyToMany(() => TrackEntity, { onDelete: 'CASCADE', eager: true })
  tracks: TrackEntity[];
}
