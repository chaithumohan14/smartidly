import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { SessionDao } from './session.dao';
import { Session } from './session.entity';
import { v4 as uuidv4 } from 'uuid';
import { verify } from 'jsonwebtoken';
@Injectable()
export class SessionService {
  private logger: Logger = new Logger(SessionService.name);

  constructor(private readonly sessionDao: SessionDao) {}

  async createNewSession(qrToken: string) {
    try {
      if (!qrToken) {
        throw new BadRequestException('QR token is required');
      }

      const decoded = verify(qrToken, 'process.env.JWT_SECRET');

      if (!decoded) {
        throw new UnauthorizedException('Invalid QR token');
      }

      const { accountId } = decoded as { accountId: number };

      const session = new Session();
      session.token = uuidv4();
      session.accountId = accountId;
      session.createdAt = Date.now();
      session.expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 30; // 30 days
      return this.sessionDao.create(session);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to create new session');
    }
  }

  async deleteSession(token: string) {
    return this.sessionDao.delete(token);
  }

  async validateSession(token: string) {
    const session = await this.sessionDao.findByToken(token);

    if (!session) {
      return null;
    }

    if (session.expiresAt < Date.now()) {
      await this.deleteSession(token);
      return null;
    }

    return session;
  }
}
