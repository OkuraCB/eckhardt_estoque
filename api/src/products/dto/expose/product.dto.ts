import { Expose } from 'class-transformer';
import { ModelDto } from '../../../model/dto/expose/model.dto';
import { CollectionDto } from '../../../collections/dto/expose/collection.dto';

export class ProductDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  code: string;

  @Expose()
  value: number;

  @Expose()
  qty: number;

  @Expose()
  description: string;

  @Expose()
  collection: CollectionDto;

  @Expose()
  model: ModelDto;

  @Expose()
  length: number;

  @Expose()
  width: number;

  @Expose()
  height: number;

  @Expose()
  heightAddon: number;

  @Expose()
  addonName: string;

  @Expose()
  image1: string;

  @Expose()
  image2: string;

  @Expose()
  image3: string;
}
