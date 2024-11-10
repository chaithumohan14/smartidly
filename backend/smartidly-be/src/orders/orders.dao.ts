import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { OrdersEntity } from './orders.entity';

@Injectable()
export class OrdersDao {
  constructor(private readonly dbService: DbService) {}

  async create(order: OrdersEntity) {
    const manager = await this.dbService.getManager();
    return manager.save(OrdersEntity, order);
  }

  async getOrdersBySessionId(accountId: number, sessionId: number) {
    const manager = await this.dbService.getManager();
    return manager.find(OrdersEntity, {
      where: { accountId, sessionId, isDeleted: false },
    });
  }

  async getOrders(accountId: number) {
    const manager = await this.dbService.getManager();
    return manager.find(OrdersEntity, {
      where: { accountId, isDeleted: false },
    });
  }

  async getOrder(orderId: number, accountId: number) {
    const manager = await this.dbService.getManager();
    return manager.findOne(OrdersEntity, {
      where: { id: orderId, accountId, isDeleted: false },
    });
  }

  async update(order: OrdersEntity) {
    const manager = await this.dbService.getManager();
    return manager.save(OrdersEntity, order);
  }

  async delete(orderId: number) {
    const manager = await this.dbService.getManager();
    return manager.update(OrdersEntity, orderId, { isDeleted: true });
  }
}
