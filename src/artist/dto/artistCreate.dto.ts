import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDTO {
  @ApiProperty({ example: 'Queen', description: 'string value' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: true, description: 'boolean value' })
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
