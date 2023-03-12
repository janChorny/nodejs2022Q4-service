import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAlbumDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  artistId: string | null;
}
