import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { UsersTable } from './users.entity';
import { validate } from 'class-validator';
import { UserStatus } from './user-status.enum';

@Injectable()
export class UsersDao {
  constructor(private readonly dbService: DbService) {}

  async findByEmail(email: string) {
    const manager = await this.dbService.getManager();
    return await manager.findOne(UsersTable, {
      where: { email, status: UserStatus.ACTIVE },
    });
  }

  async findById(id: number) {
    const manager = await this.dbService.getManager();
    return await manager.findOne(UsersTable, { where: { id } });
  }

  async createUser(user: UsersTable) {
    const errors = await validate(user);

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }
    const manager = await this.dbService.getManager();
    return await manager.save(user);
  }

  async update(user: UsersTable) {
    const manager = await this.dbService.getManager();
    return await manager.save(user);
  }

  async updateUser(id: number, user: Partial<UsersTable>) {
    const manager = await this.dbService.getManager();
    return await manager.update(UsersTable, id, user);
  }
}
