import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ModelsController } from './model.controller';
import { ModelsService } from './model.service';

@Module({
  controllers: [ModelsController],
  providers: [ModelsService, PrismaService],
})
export class ModelsModule {}
