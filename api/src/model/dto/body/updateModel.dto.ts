import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateModelDto {
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString()
  name: string;
}
