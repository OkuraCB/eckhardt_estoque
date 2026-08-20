import { Expose } from 'class-transformer';
import { CollectionDto } from '../../../collections/dto/expose/collection.dto';
import { ModelDto } from '../../../model/dto/expose/model.dto';
import { ImageDto } from './image.dto';

export class ProductDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  code: string;

  @Expose()
  price: number;

  @Expose()
  cost: number;

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
  image1: ImageDto;

  @Expose()
  image2: ImageDto;

  @Expose()
  image3: ImageDto;
}
