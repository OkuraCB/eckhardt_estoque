import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCollectionDto {
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString()
  name: string;
}
