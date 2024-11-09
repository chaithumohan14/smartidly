import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsersTable } from 'src/users/users.entity';

export interface IRequestDetails {
  user: UsersTable;
}

export const RequestDetails = createParamDecorator<IRequestDetails>(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return {
      user: request['user'] as UsersTable,
    };
  },
);
