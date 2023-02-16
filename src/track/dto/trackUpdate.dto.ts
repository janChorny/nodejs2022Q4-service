import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTrackDTO {
  @ApiProperty({ example: 'Innuendo', description: 'string value' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '1:00', description: 'number value' })
  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'string value',
  })
  @IsOptional()
  @IsString()
  artistId: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'string value',
  })
  @IsOptional()
  @IsString()
  albumId: string;
}
