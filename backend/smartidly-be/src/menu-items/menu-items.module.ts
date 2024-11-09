import { Module } from '@nestjs/common';
import { MenuItemsService } from './menu-items.service';
import { MenuItemsController } from './menu-items.controller';
import { DbModule } from 'src/db/db.module';
import { MenuItemsDao } from './meunu-items.dao';
import { IngredientsModule } from 'src/ingredients/ingredients.module';

@Module({
  providers: [MenuItemsService, MenuItemsDao],
  controllers: [MenuItemsController],
  imports: [DbModule, IngredientsModule],
})
export class MenuItemsModule {}
