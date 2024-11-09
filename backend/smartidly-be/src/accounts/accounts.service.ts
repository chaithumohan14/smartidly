import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AccountsDao } from './accounts.dao';
import { IRequestDetails } from 'src/auth/request-details.decorator';
import { CreateAccountRequest } from './request-models/create-account.request';
import { Account } from './account.entity';
import { AccountStatus } from './account-status.enum';
import { UsersTable } from 'src/users/users.entity';
import { UsersDao } from 'src/users/users.dao';
import { UserStatus } from 'src/users/user-status.enum';
import { UserType } from 'src/users/user-type.enum';
import { isEmail } from 'class-validator';
import { UpdateAccountStatusRequest } from './request-models/update-account-status.request';
import * as jwt from 'jsonwebtoken';
import { EmailService } from 'src/email-service/email-service.service';

@Injectable()
export class AccountsService {
  private logger = new Logger(AccountsService.name);

  constructor(
    private readonly accountsDao: AccountsDao,
    private readonly usersDao: UsersDao,
    private readonly emailService: EmailService,
  ) {}

  async getMyAccount(requestDetails: IRequestDetails) {
    return requestDetails.account;
  }

  async createAccount(body: CreateAccountRequest) {
    if (
      body.password !== body.confirmPassword ||
      !body.confirmPassword ||
      !body.password
    ) {
      throw new BadRequestException('Passwords do not match');
    }

    if (!isEmail(body.email)) {
      throw new BadRequestException('Invalid email');
    }

    const account = new Account();
    account.accountName = body.accountName;
    account.status = AccountStatus.PENDING;

    this.logger.log(`Creating account ${account.accountName}`);
    const createdAccount = await this.accountsDao.createAccount(account);
    const accountId = createdAccount.id;
    this.logger.log(`Created account ${accountId}`);

    this.logger.log(`Creating user for account ${accountId}`);
    const user = new UsersTable();
    user.email = body.email;
    user.password = body.password;
    user.firstName = body.firstName;
    user.lastName = body.lastName;
    user.name = body.userName;
    user.accountId = accountId;
    user.status = UserStatus.PENDING;
    user.type = UserType.ADMIN;

    const createdUser = await this.usersDao.createUser(user);
    this.logger.log(`Created user ${createdUser.id} for account ${accountId}`);

    await this.accountsDao.updateAccount(accountId, {
      createdBy: createdUser.id,
    });

    this.logger.log(
      `Updating account ${accountId} with createdBy ${createdUser.id}`,
    );

    await this.sendAccountActivationEmail(createdAccount, createdUser);

    return {
      account: createdAccount,
      user: createdUser,
    };
  }

  async sendAccountActivationEmail(account: Account, user: UsersTable) {
    const token = jwt.sign(
      { accountId: account.id, userId: user.id },
      'process.env.JWT_SECRET',
      {
        expiresIn: '1h',
      },
    );

    const url = `${process.env.FRONTEND_URL}/activate-account?token=${token}`;

    await this.emailService.sendEmail(
      user.email,
      'Account Activation',
      `
      <p>Please click the following link to activate your account: ${url}</p>
      `,
    );
  }

  async updateAccountStatus(body: UpdateAccountStatusRequest) {
    try {
      this.logger.log(`Updating account status with token ${body.token}`);
      const token = body.token;
      const decoded = jwt.verify(token, 'process.env.JWT_SECRET');
      this.logger.log(`Decoded token ${JSON.stringify(decoded)}`);
      const accountId = decoded['accountId'];
      const userId = decoded['userId'];

      const account = await this.accountsDao.findById(accountId);
      if (!account) {
        throw new BadRequestException('Account not found');
      }

      const user = await this.usersDao.findById(userId);

      if (!user) {
        throw new BadRequestException('User not found');
      }

      if (Number(user.accountId) !== Number(accountId)) {
        throw new BadRequestException(
          `User of accountId: ${user.accountId} does not belong to account ${accountId}`,
        );
      }

      await this.accountsDao.updateAccount(accountId, {
        status: AccountStatus.ACTIVE,
      });
      this.logger.log(
        `Updated account ${accountId} status to ${AccountStatus.ACTIVE}`,
      );

      await this.usersDao.updateUser(userId, {
        status: UserStatus.ACTIVE,
      });
      this.logger.log(`Updated user ${userId} status to ${UserStatus.ACTIVE}`);
    } catch (error) {
      this.logger.error(`Error decoding token ${error}`);
      throw new BadRequestException('Invalid token');
    }
  }
}
