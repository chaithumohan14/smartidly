import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order_to_menu_item')
export class OrderToMenuItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  menuItemId: number;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false })
  unitPrice: number;

  @Column({ nullable: false })
  totalPrice: number;

  @Column({ nullable: false })
  accountId: number;
}
