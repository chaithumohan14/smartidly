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

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  accountId: number;

  @Column({ default: false })
  isDeleted: boolean;

  @Column()
  createdAt: number;

  @Column({ nullable: true })
  updatedAt: number;

  @Column({ nullable: true })
  deletedAt: number;

  @ManyToMany(() => IngredientsEntity, {
    cascade: true,
  })
  @JoinTable()
  ingredients: IngredientsEntity[];

  ingredientIds: number[];

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
