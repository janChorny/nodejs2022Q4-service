import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateAlbumDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  artistId: string | null;
}
