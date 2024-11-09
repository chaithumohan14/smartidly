import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OrdersEntity } from './orders.entity';
import { OrdersService } from './orders.service';
import { SessionDetails } from 'src/auth/session-details.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(
    @Body() order: OrdersEntity,
    @SessionDetails() sessionDetails: SessionDetails,
  ) {
    return this.ordersService.create(sessionDetails, order);
  }

  @Get()
  async getOrders(@SessionDetails() sessionDetails: SessionDetails) {
    return this.ordersService.getOrders(sessionDetails);
  }

  @Get(':id')
  async getOrder(
    @Param('id') id: number,
    @SessionDetails() sessionDetails: SessionDetails,
  ) {
    return this.ordersService.getOrder(id, sessionDetails);
  }

  @Put(':id')
  async updateOrder(
    @Param('id') id: number,
    @Body() order: OrdersEntity,
    @SessionDetails() sessionDetails: SessionDetails,
  ) {
    return this.ordersService.updateOrder(id, order, sessionDetails);
  }
}
