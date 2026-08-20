import { Expose } from 'class-transformer';

export class ImageDto {
  @Expose()
  data: string;

  @Expose()
  filename: string;

  @Expose()
  mimetype: string;
}
