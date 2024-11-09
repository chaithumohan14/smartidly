import { Injectable } from '@nestjs/common';
import { IRequestDetails } from 'src/auth/request-details.decorator';
import { UsersDao } from './users.dao';
import { UsersTable } from './users.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersDao: UsersDao) {}

  async getMe(requestDetails: IRequestDetails) {
    return requestDetails.user;
  }

  async updateMe(requestDetails: IRequestDetails, updatePayload: UsersTable) {
    const user = requestDetails.user;

    if (updatePayload.firstName) {
      user.firstName = updatePayload.firstName;
    }

    if (updatePayload.lastName) {
      user.lastName = updatePayload.lastName;
    }

    if (updatePayload.avatar) {
      user.avatar = updatePayload.avatar;
    }

    return await this.usersDao.update(user);
  }
}
