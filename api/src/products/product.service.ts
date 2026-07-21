import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProductDto } from './dto/body/createProduct.dto';
import { UpdateProductDto } from './dto/body/updateProduct.dto';
import { ProductCreateError } from './errors/productCreateError.error';
import { ProductDeleteError } from './errors/productDeleteError.error';
import { ProductUpdateError } from './errors/productUpdateError.error';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductDto) {
    const newProduct = await this.prisma.product.create({
      data: {
        ...data,
        collection: {
          connectOrCreate: {
            where: { name: data.collectionName },
            create: { name: data.collectionName },
          },
        },
        model: {
          connectOrCreate: {
            where: { name: data.modelName },
            create: { name: data.modelName },
          },
        },
      },
    });

    if (!newProduct) throw new ProductCreateError();

    return newProduct;
  }

  async update(id: number, data: UpdateProductDto) {
    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: {
        ...data,
        collection: {
          connectOrCreate: {
            where: { name: data.collectionName },
            create: { name: data.collectionName },
          },
        },
        model: {
          connectOrCreate: {
            where: { name: data.modelName },
            create: { name: data.modelName },
          },
        },
      },
    });

    if (!updatedProduct) throw new ProductUpdateError();

    return updatedProduct;
  }

  async delete(id: number) {
    const deletedProduct = await this.prisma.product.delete({
      where: { id },
    });

    if (!deletedProduct) throw new ProductDeleteError();

    return deletedProduct;
  }

  async list() {
    const products = await this.prisma.product.findMany({
      include: { collection: true, model: true },
    });

    if (products.length < 1) return [];

    return products;
  }
}
