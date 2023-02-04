import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateArtistDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
