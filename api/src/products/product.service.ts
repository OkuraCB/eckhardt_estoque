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

  async create(images: Express.Multer.File[], data: CreateProductDto) {
    let { collectionName, modelName, ...sanitizedData } = data;

    collectionName = collectionName ?? 'Sem Coleção';
    modelName = modelName ?? 'Sem Modelo';

    try {
      const newProduct = await this.prisma.product.create({
        data: {
          ...sanitizedData,
          collection: {
            connectOrCreate: {
              where: { name: collectionName },
              create: { name: collectionName },
            },
          },
          model: {
            connectOrCreate: {
              where: { name: modelName },
              create: { name: modelName },
            },
          },
        },
      });

      if (!newProduct) throw new ProductCreateError();

      return newProduct;
    } catch (e) {
      throw new ProductCreateError();
    }
  }

  async update(id: number, data: UpdateProductDto) {
    let { collectionName, modelName, ...sanitizedData } = data;

    collectionName = collectionName ?? 'Sem Coleção';
    modelName = modelName ?? 'Sem Modelo';

    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: {
        ...sanitizedData,
        collection: {
          connectOrCreate: {
            where: { name: collectionName },
            create: { name: collectionName },
          },
        },
        model: {
          connectOrCreate: {
            where: { name: modelName },
            create: { name: modelName },
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
