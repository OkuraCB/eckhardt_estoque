import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCollectionDto {
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString()
  name: string;
}
