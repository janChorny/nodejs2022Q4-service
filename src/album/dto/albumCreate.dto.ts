import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDTO {
  @ApiProperty({ example: 'Innuendo', description: 'string value' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '1991', description: 'number value' })
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiProperty({
    example: null,
    description: 'string value or null by default',
  })
  @IsOptional()
  @IsString()
  artistId: string;
}
