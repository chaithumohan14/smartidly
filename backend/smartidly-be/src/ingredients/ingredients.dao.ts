import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { IngredientsEntity } from './ingredients.entity';
import { In } from 'typeorm';

@Injectable()
export class IngredientsDao {
  constructor(private readonly dbService: DbService) {}

  async getAll(accountId: number) {
    const manager = await this.dbService.getManager();
    return manager.find(IngredientsEntity, {
      where: { accountId, isDeleted: false },
    });
  }

  async getByIds(ids: number[], accountId: number) {
    const manager = await this.dbService.getManager();
    return manager.find(IngredientsEntity, {
      where: { id: In(ids), accountId, isDeleted: false },
    });
  }

  async create(ingredient: IngredientsEntity) {
    const manager = await this.dbService.getManager();
    return manager.save(IngredientsEntity, ingredient);
  }

  async getById(id: number, accountId: number) {
    const manager = await this.dbService.getManager();
    return manager.findOne(IngredientsEntity, {
      where: { id, accountId, isDeleted: false },
    });
  }

  async update(ingredient: Partial<IngredientsEntity>) {
    const manager = await this.dbService.getManager();
    return manager.update(IngredientsEntity, ingredient.id, {
      ...ingredient,
    });
  }

  async delete(id: number) {
    const manager = await this.dbService.getManager();
    return manager.update(IngredientsEntity, id, { isDeleted: true });
  }
}
