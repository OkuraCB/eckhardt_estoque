import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateModelDto } from './dto/body/createModel.dto';
import { UpdateModelDto } from './dto/body/updateModel.dto';
import { ModelCreateError } from './errors/modelCreateError.error';
import { ModelDeleteError } from './errors/modelDeleteError.error';
import { ModelUpdateError } from './errors/modelUpdateError.error';

@Injectable()
export class ModelsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateModelDto) {
    const newModel = await this.prisma.model.create({
      data,
    });

    if (!newModel) throw new ModelCreateError();

    return newModel;
  }

  async update(id: number, data: UpdateModelDto) {
    const updatedModel = await this.prisma.model.update({
      where: { id },
      data,
    });

    if (!updatedModel) throw new ModelUpdateError();

    return updatedModel;
  }

  async delete(id: number) {
    const deletedModel = await this.prisma.model.delete({
      where: { id },
    });

    if (!deletedModel) throw new ModelDeleteError();

    return deletedModel;
  }

  async list() {
    const models = await this.prisma.model.findMany({
      include: { products: true },
    });

    if (models.length < 1) return [];

    return models;
  }
}
