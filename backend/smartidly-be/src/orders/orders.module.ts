import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersDao } from './orders.dao';
import { DbModule } from 'src/db/db.module';
import { PusherModule } from 'src/pusher/pusher.module';

@Module({
  providers: [OrdersService, OrdersDao],
  controllers: [OrdersController],
  imports: [DbModule, PusherModule],
})
export class OrdersModule {}
