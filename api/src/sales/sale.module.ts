import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SalesController } from './sale.controller';
import { SalesService } from './sale.service';

@Module({
  controllers: [SalesController],
  providers: [SalesService, PrismaService],
})
export class SalesModule {}
