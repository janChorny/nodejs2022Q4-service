import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  login: string;

  @Column({ default: 1 })
  version: number;

  @Column({ default: Math.floor(Date.now() / 1000) })
  createdAt: number;

  @Column({ default: Math.floor(Date.now() / 1000) })
  updatedAt: number;

  @Exclude()
  @Column({ nullable: false })
  password: string;
}
