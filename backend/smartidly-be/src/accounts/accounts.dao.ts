import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { Account } from './account.entity';

@Injectable()
export class AccountsDao {
  constructor(private readonly dbService: DbService) {}

  async findById(id: number) {
    const manager = await this.dbService.getManager();
    const account = await manager.findOne(Account, {
      where: { id, isDeleted: false },
    });
    return account;
  }

  async createAccount(account: Account) {
    const manager = await this.dbService.getManager();
    await manager.save(account);
    return account;
  }

  async updateAccount(accountId: number, account: Partial<Account>) {
    const manager = await this.dbService.getManager();
    await manager.update(Account, accountId, account);
  }
}
