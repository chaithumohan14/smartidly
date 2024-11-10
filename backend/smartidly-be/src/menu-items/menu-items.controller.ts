import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MenuItemsService } from './menu-items.service';
import {
  IRequestDetails,
  RequestDetails,
} from 'src/auth/request-details.decorator';
import { MenuItemsEntity } from './menu-items.entity';

@Controller('menu-items')
export class MenuItemsController {
  constructor(private readonly menuItemsService: MenuItemsService) {}

  @Get()
  async getAll(@RequestDetails() requestDetails: IRequestDetails) {
    return this.menuItemsService.getAll(requestDetails);
  }

  @Post()
  async create(
    @RequestDetails() requestDetails: IRequestDetails,
    @Body() menuItem: MenuItemsEntity,
  ) {
    return this.menuItemsService.create(requestDetails, menuItem);
  }

  @Put(':id')
  async update(
    @RequestDetails() requestDetails: IRequestDetails,
    @Body() menuItem: MenuItemsEntity,
  ) {
    return this.menuItemsService.update(requestDetails, menuItem);
  }

  @Delete(':id')
  async delete(
    @RequestDetails() requestDetails: IRequestDetails,
    @Param('id') id: number,
  ) {
    return this.menuItemsService.delete(requestDetails, id);
  }
}
