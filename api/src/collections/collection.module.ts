import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CollectionsController } from './collection.controller';
import { CollectionsService } from './collection.service';

@Module({
  controllers: [CollectionsController],
  providers: [CollectionsService, PrismaService],
})
export class CollectionsModule {}
