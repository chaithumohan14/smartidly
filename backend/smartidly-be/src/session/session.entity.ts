import { Column } from 'typeorm';
import { Entity } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column({ nullable: false, type: 'bigint' })
  accountId: number;

  @Column({ nullable: false, type: 'bigint' })
  createdAt: number;

  @Column({ nullable: false, type: 'bigint' })
  expiresAt: number;
}
