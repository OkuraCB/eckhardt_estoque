import { IsOptional, IsString } from 'class-validator';

export class CreateSaleDto {
  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  phone: string;
}
