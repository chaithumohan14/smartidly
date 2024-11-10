import { Injectable, NotFoundException } from '@nestjs/common';
import { OrdersDao } from './orders.dao';
import { OrdersEntity } from './orders.entity';
import { SessionDetails } from 'src/auth/session-details.decorator';
import { OrderStatus } from './order-status.enum';
import { PusherService } from 'src/pusher/pusher.service';
import { IRequestDetails } from 'src/auth/request-details.decorator';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersDao: OrdersDao,
    private readonly pusherService: PusherService,
  ) {}

  async create(sessionDetails: SessionDetails, order: OrdersEntity) {
    const account = sessionDetails.account;
    const session = sessionDetails.session;

    const newOrder = new OrdersEntity();
    newOrder.accountId = account.id;
    newOrder.sessionId = session.id;
    newOrder.createdAt = Date.now();
    newOrder.updatedAt = Date.now();
    newOrder.orderToMenuItems = order.orderToMenuItems;
    newOrder.totalPrice = order.totalPrice;
    newOrder.status = OrderStatus.PENDING;
    newOrder.deliveryAddress = order.deliveryAddress;

    if (newOrder.orderToMenuItems) {
      for (const orderToMenuItem of newOrder.orderToMenuItems) {
        orderToMenuItem.accountId = account.id;
      }
    }

    const createdOrder = await this.ordersDao.create(newOrder);

    this.pusherService.trigger(`orders-${account.id}`, 'new-order', {
      ...createdOrder,
      orderToMenuItems: [],
    });

    return createdOrder;
  }

  async getOrdersForSessionUser(sessionDetails: SessionDetails) {
    const account = sessionDetails.account;
    return this.ordersDao.getOrdersBySessionId(
      account.id,
      sessionDetails.session.id,
    );
  }

  async getOrders(requestDetails: IRequestDetails) {
    const account = requestDetails.account;
    return this.ordersDao.getOrders(account.id);
  }

  async getOrder(orderId: number, sessionDetails: SessionDetails) {
    const account = sessionDetails.account;
    return this.ordersDao.getOrder(orderId, account.id);
  }

  async updateOrder(
    orderId: number,
    order: OrdersEntity,
    sessionDetails: SessionDetails,
  ) {
    const account = sessionDetails.account;
    const session = sessionDetails.session;

    const existingOrder = await this.ordersDao.getOrder(orderId, account.id);

    if (!existingOrder) {
      throw new NotFoundException('Order not found');
    }

    const updatedOrder = new OrdersEntity();
    updatedOrder.id = orderId;
    updatedOrder.accountId = account.id;
    updatedOrder.updatedAt = Date.now();
    updatedOrder.orderToMenuItems = order.orderToMenuItems;
    updatedOrder.totalPrice = order.totalPrice;
    updatedOrder.status = order.status;
    updatedOrder.deliveryAddress = order.deliveryAddress;

    await this.ordersDao.update(updatedOrder);

    this.pusherService.trigger(`orders-${account.id}`, 'order-updated', {
      ...updatedOrder,
      orderToMenuItems: [],
    });

    this.pusherService.trigger(`session-${session.id}`, 'order-updated', {
      ...updatedOrder,
      orderToMenuItems: [],
    });

    return updatedOrder;
  }
}
