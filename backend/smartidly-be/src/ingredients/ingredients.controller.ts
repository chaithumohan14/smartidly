import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsEntity } from './ingredients.entity';
import {
  IRequestDetails,
  RequestDetails,
} from 'src/auth/request-details.decorator';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get()
  async getAll(@RequestDetails() requestDetails: IRequestDetails) {
    return this.ingredientsService.getAll(requestDetails);
  }

  @Post()
  async create(
    @Body() ingredient: IngredientsEntity,
    @RequestDetails() requestDetails: IRequestDetails,
  ) {
    return this.ingredientsService.create(requestDetails, ingredient);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() ingredient: IngredientsEntity,
    @RequestDetails() requestDetails: IRequestDetails,
  ) {
    return this.ingredientsService.update(requestDetails, {
      id,
      ...ingredient,
    } as IngredientsEntity);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: number,
    @RequestDetails() requestDetails: IRequestDetails,
  ) {
    return this.ingredientsService.delete(requestDetails, id);
  }
}
