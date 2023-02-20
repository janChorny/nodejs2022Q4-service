import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArtistScheme } from 'src/utils/schemes/artist.scheme';
import { ArtistService } from './artist.service';
import { CreateArtistDTO } from './dto/artistCreate.dto';
import { UpdateArtistDTO } from './dto/artistUpdate.dto';

@ApiTags('Artists')
@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({ status: HttpStatus.OK, type: [ArtistScheme] })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllArtists() {
    return await this.artistService.getAllArtists();
  }

  @ApiOperation({ summary: 'Get artist by id' })
  @ApiResponse({ status: HttpStatus.OK, type: ArtistScheme })
  @HttpCode(HttpStatus.OK)
  @Get(':artistId')
  async getArtist(@Param('artistId', new ParseUUIDPipe()) artistId: string) {
    return await this.artistService.getArtist(artistId);
  }

  @ApiOperation({ summary: 'Create Artist' })
  @ApiResponse({ status: HttpStatus.CREATED, type: ArtistScheme })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createArtist(@Body() createArtistDTO: CreateArtistDTO) {
    return await this.artistService.createArtist(createArtistDTO);
  }

  @ApiOperation({
    summary: 'Update artist by id',
  })
  @ApiResponse({ status: HttpStatus.OK, type: ArtistScheme })
  @HttpCode(HttpStatus.OK)
  @Put(':artistId')
  async updateArtist(
    @Param('artistId', new ParseUUIDPipe()) artistId: string,
    @Body() updateArtistDTO: UpdateArtistDTO,
  ) {
    return await this.artistService.updateArtist(artistId, updateArtistDTO);
  }

  @ApiOperation({
    summary: 'Delete artist by id',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.artistService.deleteArtist(id);
  }
}
