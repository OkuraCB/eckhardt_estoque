import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ErrorMessages } from '../common/enums/errorMessages';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CollectionsService } from './collection.service';
import { CreateCollectionDto } from './dto/body/createCollection.dto';
import { UpdateCollectionDto } from './dto/body/updateCollection.dto';
import { CollectionDto } from './dto/expose/collection.dto';
import { CollectionCreateError } from './errors/collectionCreateError.error';
import { CollectionDeleteError } from './errors/collectionDeleteError.error';
import { CollectionUpdateError } from './errors/collectionUpdateError.error';

@UseGuards(JwtAuthGuard)
@Controller('/api/collections')
export class CollectionsController {
  constructor(private collectionsService: CollectionsService) {}

  @Get()
  @Serialize(CollectionDto)
  async listCollections() {
    try {
      return await this.collectionsService.list();
    } catch (e: any) {
      console.log(e.message);
    }
  }

  @Post()
  @Serialize(CollectionDto)
  async createCollection(@Body() body: CreateCollectionDto) {
    try {
      return await this.collectionsService.create(body);
    } catch (e: any) {
      if (e instanceof CollectionCreateError)
        throw new UnprocessableEntityException(e.message);

      throw new InternalServerErrorException(ErrorMessages.DEFAULT_MESSAGE);
    }
  }

  @Patch('/:id')
  @Serialize(CollectionDto)
  async updateCollection(
    @Param('id') id: number,
    @Body() body: UpdateCollectionDto,
  ) {
    try {
      return await this.collectionsService.update(id, body);
    } catch (e: any) {
      if (e instanceof CollectionUpdateError)
        throw new UnprocessableEntityException(e.message);

      throw new InternalServerErrorException(ErrorMessages.DEFAULT_MESSAGE);
    }
  }

  @Delete('/:id')
  @Serialize(CollectionDto)
  async deleteCollection(@Param('id') id: number) {
    try {
      return await this.collectionsService.delete(id);
    } catch (e: any) {
      if (e instanceof CollectionDeleteError)
        throw new BadRequestException(e.message);

      throw new InternalServerErrorException(ErrorMessages.DEFAULT_MESSAGE);
    }
  }
}
