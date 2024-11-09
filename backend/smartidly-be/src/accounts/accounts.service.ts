import { Injectable } from '@nestjs/common';
import { AccountsDao } from './accounts.dao';
import { IRequestDetails } from 'src/auth/request-details.decorator';
import { CreateAccountRequest } from './request-models/create-account.request';
import { Account } from './account.entity';
import { AccountStatus } from './account-status.enum';
import { UsersTable } from 'src/users/users.entity';
import { UsersDao } from 'src/users/users.dao';
import { ApiKeyTable } from 'src/api-key/api-key.entity';
import { ApiKeyDao } from 'src/api-key/api-key.dao';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AccountsService {
  constructor(
    private readonly accountsDao: AccountsDao,
    private readonly usersDao: UsersDao,
    private readonly apiKeyDao: ApiKeyDao,
  ) {}

  async getMyAccount(requestDetails: IRequestDetails) {
    return requestDetails.account;
  }

  async createAccount(body: CreateAccountRequest) {
    const account = new Account();
    account.accountName = body.accountName;
    account.status = AccountStatus.TRIAL;

    const createdAccount = await this.accountsDao.createAccount(account);
    const accountId = createdAccount.id;

    const user = new UsersTable();
    user.email = body.email;
    user.password = body.password;
    user.firstName = body.firstName;
    user.lastName = body.lastName;
    user.name = body.userName;
    user.accountId = accountId;

    const createdUser = await this.usersDao.createUser(user);
    await this.accountsDao.updateAccount(accountId, {
      createdBy: createdUser.id,
    });

    const apiKey = new ApiKeyTable();
    apiKey.userId = createdUser.id;
    apiKey.key = uuidv4();

    const createdApiKey = await this.apiKeyDao.createApiKey(apiKey);

    return {
      account: createdAccount,
      user: createdUser,
      apiKey: createdApiKey,
    };
  }
}
