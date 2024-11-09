import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { AccountsDao } from './accounts.dao';
import { DbService } from 'src/db/db.service';
import { UsersDao } from 'src/users/users.dao';
import { ApiKeyDao } from 'src/api-key/api-key.dao';
import { EmailService } from 'src/email-service/email-service.service';

@Module({
  controllers: [AccountsController],
  providers: [
    AccountsService,
    AccountsDao,
    DbService,
    UsersDao,
    ApiKeyDao,
    EmailService,
  ],
  exports: [AccountsService, AccountsDao, UsersDao, ApiKeyDao],
})
export class AccountsModule {}
