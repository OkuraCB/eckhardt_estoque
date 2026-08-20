import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateSaleDto } from './dto/body/createSale.dto';
import { SaleCreationError } from './errors/saleCreateError.error';
import { SaleDeleteError } from './errors/saleDeleteError.error';

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateSaleDto, productId: number) {
    const newSale = await this.prisma.sale.create({
      data: {
        ...data,
        product: {
          connect: {
            id: productId,
          },
        },
      },
      include: {
        product: { select: { name: true, cost: true, price: true, qty: true } },
      },
    });

    if (!newSale) throw new SaleCreationError();

    await this.prisma.product.update({
      where: { id: productId },
      data: { qty: newSale.product.qty - 1 },
    });

    return newSale;
  }

  async delete(id: number) {
    const deletedSale = await this.prisma.sale.delete({
      where: { id },
    });

    if (!deletedSale) throw new SaleDeleteError();

    return deletedSale;
  }

  async list() {
    const sales = await this.prisma.sale.findMany({
      include: {
        product: { select: { name: true, cost: true, price: true, qty: true } },
      },
    });

    if (sales.length < 1) return [];

    return sales;
  }
}
