import { Body, Controller, Get, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { RequestDetails } from 'src/auth/request-details.decorator';
import { IRequestDetails } from 'src/auth/request-details.decorator';
import { UsersTable } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getMe(@RequestDetails() requestDetails: IRequestDetails) {
    return this.usersService.getMe(requestDetails);
  }

  @Put('me')
  updateMe(
    @RequestDetails() requestDetails: IRequestDetails,
    @Body() body: UsersTable,
  ) {
    return this.usersService.updateMe(requestDetails, body);
  }
}
