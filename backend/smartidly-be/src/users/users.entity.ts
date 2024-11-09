import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserStatus } from './user-status.enum';
import { UserType } from './user-type.enum';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { IsEmail } from 'class-validator';

@Entity('users')
export class UsersTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  firstName: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  lastName: string;

  @Column({ type: 'varchar', length: 255 })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'bigint' })
  createdAt: number;

  @Column({ type: 'bigint', nullable: true })
  updatedAt: number;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.PENDING })
  status: UserStatus;

  @Column({ type: 'enum', enum: UserType, nullable: true })
  type: UserType;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
    this.createdAt = Number(moment().unix());
  }

  @BeforeUpdate()
  async updateUpdatedAt() {
    this.updatedAt = Number(moment().unix());
  }
}
