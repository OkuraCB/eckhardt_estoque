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
import { CreateProductDto } from './dto/body/createProduct.dto';
import { UpdateProductDto } from './dto/body/updateProduct.dto';
import { ProductDto } from './dto/expose/product.dto';
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
  async createProduct(@Body() body: CreateProductDto) {
    try {
      return await this.productsService.create(body);
    } catch (e: any) {
      if (e instanceof ProductCreateError)
        throw new UnprocessableEntityException(e.message);
    
      console.log(e.message)

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
