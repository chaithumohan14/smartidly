import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { ApiKeyTable } from './api-key.entity';

@Injectable()
export class ApiKeyDao {
  constructor(private readonly dbService: DbService) {}

  async createApiKey(apiKey: ApiKeyTable) {
    const manager = await this.dbService.getManager();
    return await manager.save(apiKey);
  }

  async findByUserId(userId: number) {
    const manager = await this.dbService.getManager();
    return await manager.findOne(ApiKeyTable, {
      where: { userId, isDeleted: false },
    });
  }

  async deleteApiKey(id: number) {
    const manager = await this.dbService.getManager();
    return await manager.update(ApiKeyTable, id, { isDeleted: true });
  }

  async findByApiKey(key: string) {
    const manager = await this.dbService.getManager();
    return await manager.findOne(ApiKeyTable, {
      where: { key, isDeleted: false },
    });
  }
}
