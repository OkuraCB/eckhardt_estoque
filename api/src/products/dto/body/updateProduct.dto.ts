import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  code: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  qty: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  collectionName: string;

  @IsOptional()
  @IsString()
  modelName: string;

  @IsOptional()
  @IsString()
  addonName: string;

  @IsOptional()
  @IsNumber()
  length: number;

  @IsOptional()
  @IsNumber()
  width: number;

  @IsOptional()
  @IsNumber()
  height: number;

  @IsOptional()
  @IsNumber()
  heightAddon: number;

  @IsOptional()
  @IsString()
  image1: string;

  @IsOptional()
  @IsString()
  image2: string;

  @IsOptional()
  @IsString()
  image3: string;
}
