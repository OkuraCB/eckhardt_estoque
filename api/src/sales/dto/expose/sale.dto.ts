import { Expose, Type } from 'class-transformer';
import { ProductDto } from '../../../products/dto/expose/product.dto';

export class SaleDto {
  @Expose()
  id: number;
  
  @Expose()
  createdAt: Date;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  name: string;

  @Expose()
  @Type(() => ProductDto)
  product: ProductDto;
}
