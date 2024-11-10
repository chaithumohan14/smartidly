import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OrdersEntity } from './orders.entity';
import { OrdersService } from './orders.service';
import { SessionDetails } from 'src/auth/session-details.decorator';
import { SessionUser } from 'src/auth/session-user.decorator';
import {
  IRequestDetails,
  RequestDetails,
} from 'src/auth/request-details.decorator';

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
  @SessionUser()
  async getOrdersForSessionUser(
    @SessionDetails() sessionDetails: SessionDetails,
  ) {
    return this.ordersService.getOrdersForSessionUser(sessionDetails);
  }

  @Get('/all')
  async getOrders(@RequestDetails() requestDetails: IRequestDetails) {
    return this.ordersService.getOrders(requestDetails);
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
