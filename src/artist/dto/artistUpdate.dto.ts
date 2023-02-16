import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateArtistDTO {
  @ApiProperty({ example: 'Queen', description: 'string value' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'No', description: 'boolean value' })
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
