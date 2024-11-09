import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { IngredientsDao } from './ingredients.dao';
import { DbModule } from 'src/db/db.module';

@Module({
  providers: [IngredientsService, IngredientsDao],
  controllers: [IngredientsController],
  imports: [DbModule],
})
export class IngredientsModule {}
