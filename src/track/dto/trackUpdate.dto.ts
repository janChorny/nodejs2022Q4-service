import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateTrackDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  artistId: string | null;

  @IsNotEmpty()
  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
