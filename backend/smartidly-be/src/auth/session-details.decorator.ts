import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Account } from 'src/accounts/account.entity';
import { Session } from 'src/session/session.entity';

export interface SessionDetails {
  account: Account;
  session: Session;
}

export const SessionDetails = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return {
      account: request['account'],
      session: request['session'],
    };
  },
);
