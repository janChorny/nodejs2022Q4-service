import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDTO } from './dto/artistCreate.dto';
import { UpdateArtistDTO } from './dto/artistUpdate.dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getAllArtists() {
    return this.artistService.getAllArtists();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = this.artistService.getArtist(id);
    if (!artist) {
      throw new HttpException(
        `Artist with such id is not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return artist;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createArtist(@Body() createArtistDTO: CreateArtistDTO) {
    return this.artistService.createArtist(createArtistDTO);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updateArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDTO: UpdateArtistDTO,
  ) {
    const artist = this.artistService.getArtist(id);
    if (!artist) {
      throw new HttpException(
        `Artist with such id is not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.artistService.updateArtist(id, updateArtistDTO);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = this.artistService.getArtist(id);
    if (!artist) {
      throw new HttpException(
        `Artist with such id is not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.artistService.deleteArtist(id);
  }
}
