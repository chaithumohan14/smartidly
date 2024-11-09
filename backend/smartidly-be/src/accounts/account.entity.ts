import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountStatus } from './account-status.enum';
import * as moment from 'moment';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  accountName: string;

  @Column({ type: 'enum', enum: AccountStatus })
  status: AccountStatus;

  @Column({ type: 'bigint' })
  createdAt: number;

  @Column({ type: 'bigint' })
  updatedAt: number;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar: string;

  @Column({ type: 'bigint', nullable: true })
  createdBy: number;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = Number(moment().unix());
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = Number(moment().unix());
  }
}
