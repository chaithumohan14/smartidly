import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderToMenuItemEntity } from './order-to-menu-item.entity';
import { OrderStatus } from './order-status.enum';

@Entity('orders')
export class OrdersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  accountId: number;

  @ManyToMany(() => OrderToMenuItemEntity, {
    cascade: true,
  })
  @JoinTable()
  orderToMenuItems: OrderToMenuItemEntity[];

  @Column({ nullable: false })
  totalPrice: number;

  @Column({ nullable: false, default: false })
  isDeleted: boolean;

  @Column({ nullable: false, type: 'bigint' })
  createdAt: number;

  @Column({ nullable: true, type: 'bigint' })
  updatedAt: number;

  @Column({ nullable: true, type: 'bigint' })
  deletedAt: number;

  @Column({
    nullable: false,
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column({ nullable: false })
  deliveryAddress: string;

  @Column({ nullable: true, type: 'bigint' })
  deliveredAt: number;

  @Column({ nullable: false })
  sessionId: number;
}
