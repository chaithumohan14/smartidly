import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { RequestDetails } from 'src/auth/request-details.decorator';
import { IRequestDetails } from 'src/auth/request-details.decorator';
import { CreateAccountRequest } from './request-models/create-account.request';
import { Public } from 'src/auth/public.decorator';
import { UpdateAccountStatusRequest } from './request-models/update-account-status.request';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get('/my-account')
  async getMyAccount(@RequestDetails() requestDetails: IRequestDetails) {
    return this.accountsService.getMyAccount(requestDetails);
  }

  @Public()
  @Post('/create')
  async createAccount(@Body() body: CreateAccountRequest) {
    return this.accountsService.createAccount(body);
  }

  @Public()
  @Post('/update-status')
  async updateAccountStatus(@Body() body: UpdateAccountStatusRequest) {
    return this.accountsService.updateAccountStatus(body);
  }
}
