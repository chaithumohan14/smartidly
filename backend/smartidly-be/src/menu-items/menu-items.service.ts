import { Injectable, NotFoundException } from '@nestjs/common';
import { MenuItemsDao } from './meunu-items.dao';
import { IRequestDetails } from 'src/auth/request-details.decorator';
import { MenuItemsEntity } from './menu-items.entity';

@Injectable()
export class MenuItemsService {
  constructor(private readonly menuItemsDao: MenuItemsDao) {}

  async getAll(requestDetails: IRequestDetails) {
    return this.menuItemsDao.getAll(requestDetails.account.id);
  }

  async create(requestDetails: IRequestDetails, menuItem: MenuItemsEntity) {
    const newMenuItem = new MenuItemsEntity();
    newMenuItem.name = menuItem.name;
    newMenuItem.description = menuItem.description;
    newMenuItem.price = menuItem.price;
    newMenuItem.accountId = requestDetails.account.id;
    newMenuItem.isDeleted = false;
    newMenuItem.createdAt = Date.now();
    newMenuItem.updatedAt = null;
    newMenuItem.deletedAt = null;
    newMenuItem.ingredients = menuItem.ingredients;

    if (newMenuItem.ingredients?.length !== 0) {
      for (const ingredient of newMenuItem.ingredients) {
        ingredient.accountId = requestDetails.account.id;
        ingredient.isDeleted = false;
        ingredient.createdAt = Date.now();
        ingredient.updatedAt = null;
        ingredient.deletedAt = null;
      }
    }

    return this.menuItemsDao.create(newMenuItem);
  }

  async update(requestDetails: IRequestDetails, menuItem: MenuItemsEntity) {
    const updatedMenuItem = new MenuItemsEntity();
    updatedMenuItem.id = menuItem.id;
    updatedMenuItem.name = menuItem.name;
    updatedMenuItem.description = menuItem.description;
    updatedMenuItem.price = menuItem.price;
    updatedMenuItem.accountId = requestDetails.account.id;

    const existingMenuItem = await this.menuItemsDao.getById(
      menuItem.id,
      requestDetails.account.id,
    );

    if (!existingMenuItem) {
      throw new NotFoundException('Menu item not found');
    }
    updatedMenuItem.ingredients = menuItem.ingredients;

    await this.menuItemsDao.update(updatedMenuItem);

    return this.menuItemsDao.getById(menuItem.id, requestDetails.account.id);
  }

  async delete(requestDetails: IRequestDetails, id: number) {
    const existingMenuItem = await this.menuItemsDao.getById(
      id,
      requestDetails.account.id,
    );

    if (!existingMenuItem) {
      throw new NotFoundException('Menu item not found');
    }

    return this.menuItemsDao.delete(id);
  }
}
