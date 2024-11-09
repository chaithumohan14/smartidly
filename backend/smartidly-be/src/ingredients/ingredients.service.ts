import { Injectable, NotFoundException } from '@nestjs/common';
import { IngredientsEntity } from './ingredients.entity';
import { IRequestDetails } from 'src/auth/request-details.decorator';
import { IngredientsDao } from './ingredients.dao';

@Injectable()
export class IngredientsService {
  constructor(private readonly ingredientsDao: IngredientsDao) {}

  async getAll(requestDetails: IRequestDetails) {
    return this.ingredientsDao.getAll(requestDetails.account.id);
  }

  async create(requestDetails: IRequestDetails, ingredient: IngredientsEntity) {
    const newIngredient = new IngredientsEntity();
    newIngredient.name = ingredient.name;
    newIngredient.description = ingredient.description;
    newIngredient.accountId = requestDetails.account.id;
    newIngredient.image = ingredient.image;

    return this.ingredientsDao.create(newIngredient);
  }

  async update(
    requestDetails: IRequestDetails,
    ingredient: Partial<IngredientsEntity>,
  ) {
    const existingIngredient = await this.ingredientsDao.getById(
      ingredient.id,
      requestDetails.account.id,
    );

    if (!existingIngredient) {
      throw new NotFoundException('Ingredient not found');
    }

    const updatedIngredient = new IngredientsEntity();
    updatedIngredient.id = ingredient.id;
    updatedIngredient.name = ingredient.name;
    updatedIngredient.description = ingredient.description;
    updatedIngredient.image = ingredient.image;

    await this.ingredientsDao.update(updatedIngredient);

    return this.ingredientsDao.getById(
      ingredient.id,
      requestDetails.account.id,
    );
  }

  async delete(requestDetails: IRequestDetails, id: number) {
    return this.ingredientsDao.delete(id);
  }
}
