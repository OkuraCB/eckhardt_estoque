import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ProductDto } from '../../../products/dto/expose/product.dto';

export class ModelDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  @Type(() => ProductDto)
  @ValidateNested({ each: true })
  products: ProductDto[];
}
