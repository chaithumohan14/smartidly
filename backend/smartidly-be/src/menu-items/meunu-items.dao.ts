import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { MenuItemsEntity } from './menu-items.entity';

@Injectable()
export class MenuItemsDao {
  constructor(private readonly dbService: DbService) {}

  async getAll(accountId: number) {
    const manager = await this.dbService.getManager();
    return manager.find(MenuItemsEntity, {
      where: { accountId, isDeleted: false },
    });
  }

  async create(menuItem: MenuItemsEntity) {
    const manager = await this.dbService.getManager();
    return manager.save(MenuItemsEntity, menuItem);
  }

  async getById(id: number, accountId: number) {
    const manager = await this.dbService.getManager();
    return manager.findOne(MenuItemsEntity, {
      where: { id, accountId, isDeleted: false },
    });
  }

  async update(menuItem: Partial<MenuItemsEntity>) {
    const manager = await this.dbService.getManager();
    return manager.update(MenuItemsEntity, menuItem.id, {
      ...menuItem,
    });
  }

  async delete(id: number) {
    const manager = await this.dbService.getManager();
    return manager.update(MenuItemsEntity, id, { isDeleted: true });
  }
}
