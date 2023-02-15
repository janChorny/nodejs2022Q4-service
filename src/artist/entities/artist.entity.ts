import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artist')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ default: false })
  grammy: boolean;
}
