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

@Injectable()
export class SmartidlyAuthGuard extends AuthGuard('api-key') {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
    private readonly usersDao: UsersDao,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
      if (isPublic) {
        return true;
      }

      const request = context.switchToHttp().getRequest<Request>();
      const key = request.headers['x-api-key'];

      if (!key) {
        throw new UnauthorizedException('Api key is required');
      }

      const apiKey = await this.authService.validateApiKey(key);
      const user = await this.usersDao.findById(apiKey.userId);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      request['user'] = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
