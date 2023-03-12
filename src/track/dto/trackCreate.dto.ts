import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTrackDTO {
  @ApiProperty({ example: 'Innuendo', description: 'string value' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 500, description: 'duration in seconds' })
  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @ApiProperty({
    example: null,
    description: 'string value or null by default',
  })
  @IsOptional()
  @IsString()
  artistId: string;

  @ApiProperty({
    example: null,
    description: 'string value or null by default',
  })
  @IsOptional()
  @IsString()
  albumId: string;
}
