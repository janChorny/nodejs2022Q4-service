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
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessGuard } from 'src/auth/guards/access.guard';
import { AlbumScheme } from 'src/utils/schemes/album.scheme';
import { AlbumService } from './album.service';
import { CreateAlbumDTO } from './dto/albumCreate.dto';
import { UpdateAlbumDTO } from './dto/albumUpdate.dto';

@ApiTags('Albums')
@Controller('album')
@UseGuards(AccessGuard)
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @ApiOperation({ summary: 'Get all albums' })
  @ApiResponse({ status: HttpStatus.OK, type: [AlbumScheme] })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllAlbums() {
    return await this.albumService.getAllAlbums();
  }

  @ApiOperation({ summary: 'Get album by id' })
  @ApiResponse({ status: HttpStatus.OK, type: AlbumScheme })
  @HttpCode(HttpStatus.OK)
  @Get(':albumId')
  async getAlbum(@Param('albumId', new ParseUUIDPipe()) albumId: string) {
    return await this.albumService.getAlbum(albumId);
  }

  @ApiOperation({ summary: 'Create Album' })
  @ApiResponse({ status: HttpStatus.CREATED, type: AlbumScheme })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createAlbum(@Body() createAlbumDTO: CreateAlbumDTO) {
    return await this.albumService.createAlbum(createAlbumDTO);
  }

  @ApiOperation({
    summary: 'Update album by id',
  })
  @ApiResponse({ status: HttpStatus.OK, type: AlbumScheme })
  @HttpCode(HttpStatus.OK)
  @Put(':albumId')
  async updateAlbum(
    @Param('albumId', new ParseUUIDPipe()) albumId: string,
    @Body() updateAlbumDTO: UpdateAlbumDTO,
  ) {
    return await this.albumService.updateAlbum(albumId, updateAlbumDTO);
  }

  @ApiOperation({
    summary: 'Delete album by id',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.albumService.deleteAlbum(id);
  }
}
