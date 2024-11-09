import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Account } from 'src/accounts/account.entity';
import { UsersTable } from 'src/users/users.entity';

export interface IRequestDetails {
  user: UsersTable;
  account: Account;
}

export const RequestDetails = createParamDecorator<IRequestDetails>(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return {
      user: request['user'] as UsersTable,
      account: request['account'] as Account,
    };
  },
);
