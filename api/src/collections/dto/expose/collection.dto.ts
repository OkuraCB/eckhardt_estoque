import { Expose, Type } from 'class-transformer';
import { ProductDto } from '../../../products/dto/expose/product.dto';
import { ValidateNested } from 'class-validator';

export class CollectionDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  @Type(() => ProductDto)
  @ValidateNested({ each: true })
  products: ProductDto[];
}
