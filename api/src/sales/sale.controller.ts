import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  UnprocessableEntityException,
  UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ErrorMessages } from '../common/enums/errorMessages';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CreateSaleDto } from './dto/body/createSale.dto';
import { SaleDto } from './dto/expose/sale.dto';
import { SaleCreationError } from './errors/saleCreateError.error';
import { SaleDeleteError } from './errors/saleDeleteError.error';
import { SalesService } from './sale.service';

@UseGuards(JwtAuthGuard)
@Controller('/api/sales')
export class SalesController {
  constructor(private salesService: SalesService) {}

  @Get()
  @Serialize(SaleDto)
  async listSales() {
    try {
      return await this.salesService.list();
    } catch (e: any) {
      console.log(e.message);
    }
  }

  @Post('/:id')
  @Serialize(SaleDto)
  async createSale(@Body() body: CreateSaleDto, @Param('id') id: number) {
    try {
      return await this.salesService.create(body, id);
    } catch (e: any) {
      if (e instanceof SaleCreationError)
        throw new UnprocessableEntityException(e.message);

      throw new InternalServerErrorException(ErrorMessages.DEFAULT_MESSAGE);
    }
  }

  @Delete('/:id')
  @Serialize(SaleDto)
  async deleteCollection(@Param('id') id: number) {
    try {
      return await this.salesService.delete(id);
    } catch (e: any) {
      if (e instanceof SaleDeleteError)
        throw new BadRequestException(e.message);

      throw new InternalServerErrorException(ErrorMessages.DEFAULT_MESSAGE);
    }
  }
}
