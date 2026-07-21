import { IsNotEmpty, IsString } from 'class-validator';

export class CreateModelDto {
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString()
  name: string;
}
