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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { promises } from 'fs';
import { diskStorage } from "multer";
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ErrorMessages } from '../common/enums/errorMessages';
import { filesConfig } from '../config/fileConfig';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UpdateProductDto } from './dto/body/updateProduct.dto';
import { ProductDto } from './dto/expose/product.dto';
import { FileExceedMaxSizeError } from './errors/fileExceedMaxSizeError.error';
import { FileExceedTotalSizeError } from './errors/fileExceedTotalSizeError.error';
import { ProductCreateError } from './errors/productCreateError.error';
import { ProductDeleteError } from './errors/productDeleteError.error';
import { ProductUpdateError } from './errors/productUpdateError.error';
import { ProductsService } from './product.service';


@Controller('/api/products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @Serialize(ProductDto)
  async listProducts() {
    try {
      return await this.productsService.list();
    } catch (e: any) {
      console.log(e.message);
    }
  }

  @Post()
  @Serialize(ProductDto)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {name: 'image1', maxCount: 1},
        {name: 'image2', maxCount: 1},
        {name: 'image3', maxCount: 1}
      ],
      {
        storage: diskStorage({
          destination: "files",
            filename: function (_req, file, cb) {
              console.log(file.originalname)
              cb(null, file.originalname)
            },
        })
      }
    )
  )
  async createProduct(@UploadedFiles() 
    files: {
      image1?: Express.Multer.File[]; 
      image2?: Express.Multer.File[]; 
      image3?: Express.Multer.File[]
    },
    @Body() body: {body: string}) {
    try {
      const MAX_SIZE = parseInt(filesConfig.useFactory().maxSize);
      const TOTAL_SIZE = parseInt(filesConfig.useFactory().totalSize);

      const images: Express.Multer.File[] = [files.image1[0], files.image2[0], files.image3[0]]

      let totalSize = 0
      for (const image of images) {
        console.log(image.size)
        if (image.size > MAX_SIZE) throw new FileExceedMaxSizeError()
        
          totalSize+=image.size
      }

      if (totalSize > TOTAL_SIZE) throw new FileExceedTotalSizeError()

      return await this.productsService.create(images, JSON.parse(body.body));
    } catch (e: any) {
      if (files.image1) await promises.rm(files.image1[0].path);
      if (files.image2) await promises.rm(files.image2[0].path);
      if (files.image3) await promises.rm(files.image3[0].path);

      if (e instanceof ProductCreateError || e instanceof FileExceedMaxSizeError || e instanceof FileExceedTotalSizeError)
        throw new UnprocessableEntityException(e.message);

      throw new InternalServerErrorException(ErrorMessages.DEFAULT_MESSAGE);
    }
  }

  @Patch('/:id')
  @Serialize(ProductDto)
  async updateProduct(@Param('id') id: number, @Body() body: UpdateProductDto) {
    try {
      return await this.productsService.update(id, body);
    } catch (e: any) {
      if (e instanceof ProductUpdateError)
        throw new UnprocessableEntityException(e.message);

      throw new InternalServerErrorException(ErrorMessages.DEFAULT_MESSAGE);
    }
  }

  @Delete('/:id')
  @Serialize(ProductDto)
  async deleteProduct(@Param('id') id: number) {
    try {
      return await this.productsService.delete(id);
    } catch (e: any) {
      if (e instanceof ProductDeleteError)
        throw new BadRequestException(e.message);

      throw new InternalServerErrorException(ErrorMessages.DEFAULT_MESSAGE);
    }
  }
}
