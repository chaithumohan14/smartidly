import { IngredientsEntity } from 'src/ingredients/ingredients.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('menu_items')
export class MenuItemsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({})
  price: number;

  @Column({ type: 'bigint' })
  accountId: number;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ type: 'bigint' })
  createdAt: number;

  @Column({ nullable: true, type: 'bigint' })
  updatedAt: number;

  @Column({ nullable: true })
  deletedAt: number;

  @ManyToMany(() => IngredientsEntity, {
    cascade: true,
  })
  @JoinTable()
  ingredients: IngredientsEntity[];

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = Date.now();
  }

  @BeforeUpdate()
  setUpdatedAt() {
    if (!this.isDeleted) {
      this.updatedAt = Date.now();
    } else {
      this.deletedAt = Date.now();
    }
  }
}
