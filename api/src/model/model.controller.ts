import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ErrorMessages } from '../common/enums/errorMessages';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CreateModelDto } from './dto/body/createModel.dto';
import { UpdateModelDto } from './dto/body/updateModel.dto';
import { ModelDto } from './dto/expose/model.dto';
import { ModelCreateError } from './errors/modelCreateError.error';
import { ModelDeleteError } from './errors/modelDeleteError.error';
import { ModelUpdateError } from './errors/modelUpdateError.error';
import { ModelsService } from './model.service';

@UseGuards(JwtAuthGuard)
@Controller('/api/models')
export class ModelsController {
  constructor(private modelsService: ModelsService) {}

  @Get()
  @Serialize(ModelDto)
  async listModels() {
    try {
      return await this.modelsService.list();
    } catch (e: any) {
      console.log(e.message);
    }
  }

  @Post()
  @Serialize(ModelDto)
  async createModel(@Body() body: CreateModelDto) {
    try {
      return await this.modelsService.create(body);
    } catch (e: any) {
      if (e instanceof ModelCreateError)
        throw new UnprocessableEntityException(e.message);

      throw new InternalServerErrorException(ErrorMessages.DEFAULT_MESSAGE);
    }
  }

  @Patch('/:id')
  @Serialize(ModelDto)
  async updateModel(@Param('id') id: number, @Body() body: UpdateModelDto) {
    try {
      return await this.modelsService.update(id, body);
    } catch (e: any) {
      if (e instanceof ModelUpdateError)
        throw new UnprocessableEntityException(e.message);

      throw new InternalServerErrorException(ErrorMessages.DEFAULT_MESSAGE);
    }
  }

  @Delete('/:id')
  @Serialize(ModelDto)
  async deleteModel(@Param('id') id: number) {
    try {
      return await this.modelsService.delete(id);
    } catch (e: any) {
      if (e instanceof ModelDeleteError)
        throw new BadRequestException(e.message);

      throw new InternalServerErrorException(ErrorMessages.DEFAULT_MESSAGE);
    }
  }
}
