import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { Session } from './session.entity';

@Injectable()
export class SessionDao {
  constructor(private readonly dbService: DbService) {}

  async findByToken(token: string) {
    const manager = await this.dbService.getManager();
    return manager.findOneBy(Session, { token });
  }

  async create(session: Session) {
    const manager = await this.dbService.getManager();
    return manager.save(Session, session);
  }

  async delete(token: string) {
    const manager = await this.dbService.getManager();
    return manager.delete(Session, { token });
  }
}
