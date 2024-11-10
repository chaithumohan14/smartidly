import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator';
import { AuthService } from './auth.service';
import { UsersDao } from 'src/users/users.dao';
import { AccountsDao } from 'src/accounts/accounts.dao';
import { IS_SESSION_USER_KEY } from './session-user.decorator';
import { IS_ADMIN_USER_KEY } from './admin-user.decorator';
import { UserType } from 'src/users/user-type.enum';

@Injectable()
export class SmartidlyAuthGuard extends AuthGuard('api-key') {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
    private readonly usersDao: UsersDao,
    private readonly accountsDao: AccountsDao,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
      if (isPublic) {
        return true;
      }

      const isSessionUser = this.reflector.get(
        IS_SESSION_USER_KEY,
        context.getHandler(),
      );

      const request = context.switchToHttp().getRequest<Request>();
      const key = request.headers['x-api-key'];

      if (!key) {
        const sessionKey = request.headers['x-session-key'];

        if (!sessionKey) {
          throw new UnauthorizedException('Api key or session key is required');
        }

        const session = await this.authService.validateSession(sessionKey);

        if (!session) {
          throw new UnauthorizedException('Invalid session key');
        }

        request['session'] = session;
        const accountId = session.accountId;
        const account = await this.accountsDao.findById(accountId);
        request['account'] = account;

        return true;
      } else {
        if (!key) {
          throw new UnauthorizedException('Api key is required');
        }

        if (isSessionUser) {
          throw new UnauthorizedException('Session user is not allowed');
        }

        const apiKey = await this.authService.validateApiKey(key);
        const user = await this.usersDao.findById(apiKey.userId);

        if (!user) {
          throw new UnauthorizedException('User not found');
        }

        const isAdminUser = this.reflector.get(
          IS_ADMIN_USER_KEY,
          context.getHandler(),
        );

        if (user && user?.type !== UserType.ADMIN && isAdminUser) {
          throw new UnauthorizedException('Only admin users are allowed');
        }

        const accountId = user.accountId;

        const account = await this.accountsDao.findById(accountId);

        if (!account) {
          throw new UnauthorizedException('Account not found');
        }

        request['user'] = user;
        request['account'] = account;
        return true;
      }
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
