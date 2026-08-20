import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProductDto } from './dto/body/createProduct.dto';
import { UpdateProductDto } from './dto/body/updateProduct.dto';
import { ProductCreateError } from './errors/productCreateError.error';
import { ProductDeleteError } from './errors/productDeleteError.error';
import { ProductUpdateError } from './errors/productUpdateError.error';
import mime from 'mime';
import { readFileSync } from 'node:fs';
import fileLoader from '../config/loaders/fileLoader';

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
          image1: images[0] ? images[0].filename : '',
          image2: images[1] ? images[1].filename : '',
          image3: images[2] ? images[2].filename : '',
        },
        include: {
          collection: true,
          model: true,
        },
      });

      if (!newProduct) throw new ProductCreateError();

      const imagesLength = images.length;
      const imageBuffers = [];

      for (const image of images) {
        imageBuffers.push(
          readFileSync(fileLoader().filesDir + '/' + image.filename),
        );
      }

      const prodImages = {
        ...newProduct,
        image1:
          imagesLength >= 1
            ? {
                data: imageBuffers[0].toString('base64'),
                filename: images[0].filename,
                mimetype: images[0].mimetype,
              }
            : null,
        image2:
          imagesLength >= 2
            ? {
                data: imageBuffers[1].toString('base64'),
                filename: images[1].filename,
                mimetype: images[1].mimetype,
              }
            : null,
        image3:
          imagesLength == 3
            ? {
                data: imageBuffers[2].toString('base64'),
                filename: images[2].filename,
                mimetype: images[2].mimetype,
              }
            : null,
      };

      return prodImages;
    } catch (e) {
      console.log(e);
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

    const productsImages = [];

    for (const product of products) {
      const { image1, image2, image3, ...body } = product;
      let image1File = null;
      let image2File = null;
      let image3File = null;

      if (image1)
        image1File = readFileSync(fileLoader().filesDir + '/' + image1);
      if (image2)
        image2File = readFileSync(fileLoader().filesDir + '/' + image2);
      if (image3)
        image3File = readFileSync(fileLoader().filesDir + '/' + image3);

      productsImages.push({
        ...body,
        image1: {
          data: image1File?.toString('base64'),
          filename: image1,
          mimetype: mime.getType(fileLoader().filesDir + '/' + image1),
        },
        image2: {
          data: image2File?.toString('base64'),
          filename: image2,
          mimetype: mime.getType(fileLoader().filesDir + '/' + image2),
        },
        image3: {
          data: image3File?.toString('base64'),
          filename: image3,
          mimetype: mime.getType(fileLoader().filesDir + '/' + image3),
        },
      });
    }

    return productsImages;
  }
}
