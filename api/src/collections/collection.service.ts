import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCollectionDto } from './dto/body/createCollection.dto';
import { CollectionCreateError } from './errors/collectionCreateError.error';
import { UpdateCollectionDto } from './dto/body/updateCollection.dto';
import { CollectionUpdateError } from './errors/collectionUpdateError.error';
import { CollectionDeleteError } from './errors/collectionDeleteError.error';

@Injectable()
export class CollectionsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCollectionDto) {
    const newCollection = await this.prisma.collection.create({
      data,
    });

    if (!newCollection) throw new CollectionCreateError();

    return newCollection;
  }

  async update(id: number, data: UpdateCollectionDto) {
    const updatedCollection = await this.prisma.collection.update({
      where: { id },
      data,
    });

    if (!updatedCollection) throw new CollectionUpdateError();

    return updatedCollection;
  }

  async delete(id: number) {
    const deletedCollection = await this.prisma.collection.delete({
      where: { id },
    });

    if (!deletedCollection) throw new CollectionDeleteError();

    return deletedCollection;
  }

  async list() {
    const collections = await this.prisma.collection.findMany({
      include: { products: true },
    });

    if (collections.length < 1) return [];

    return collections;
  }
}
