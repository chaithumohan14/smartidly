import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as moment from 'moment';
@Entity('api_key')
export class ApiKeyTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  key: string;

  @Column({ type: 'bigint' })
  createdAt: number;

  @Column({ type: 'bigint' })
  userId: number;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.createdAt = Number(moment().unix());
  }
}
