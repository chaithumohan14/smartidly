import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersDao } from 'src/users/users.dao';
import * as bcrypt from 'bcrypt';
import { UsersTable } from 'src/users/users.entity';
import { ApiKeyDao } from 'src/api-key/api-key.dao';
import { ApiKeyTable } from 'src/api-key/api-key.entity';
import * as crypto from 'crypto';
import { IRequestDetails } from './request-details.decorator';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersDao: UsersDao,
    private readonly apiKeyDao: ApiKeyDao,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersDao.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const apiKey = await this.apiKeyDao.findByUserId(user.id);
    if (apiKey) {
      return apiKey;
    }

    const newApiKey = new ApiKeyTable();
    newApiKey.userId = user.id;
    newApiKey.key = crypto.randomUUID();

    return await this.apiKeyDao.createApiKey(newApiKey);
  }

  async register(user: UsersTable) {
    const existingUser = await this.usersDao.findByEmail(user.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const newUser = new UsersTable();
    newUser.email = user.email;
    newUser.name = user.name;
    newUser.password = user.password;

    try {
      return await this.usersDao.createUser(newUser);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async logout(requestDetails: IRequestDetails) {
    const apiKey = await this.apiKeyDao.findByUserId(requestDetails.user.id);
    if (!apiKey) {
      throw new UnauthorizedException('Invalid api key');
    }

    return await this.apiKeyDao.deleteApiKey(apiKey.id);
  }

  async validateApiKey(key: string) {
    const apiKey = await this.apiKeyDao.findByApiKey(key);
    if (!apiKey) {
      throw new UnauthorizedException('Invalid api key');
    }

    return apiKey;
  }
}
