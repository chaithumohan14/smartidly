import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity('ingredients')
export class IngredientsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  name: string;

  @Column({ nullable: true, type: 'varchar', length: 255 })
  image: string;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  description: string;

  @Column({ nullable: false })
  accountId: number;

  @Column({ nullable: false, type: 'bigint' })
  createdAt: number;

  @Column({ nullable: true, type: 'bigint' })
  updatedAt: number;

  @Column({ nullable: false, default: false })
  isDeleted: boolean;

  @Column({ nullable: true, type: 'bigint' })
  deletedAt: number;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = Date.now();
  }

  @BeforeUpdate()
  setUpdatedAt() {
    if (!!this.isDeleted) {
      this.deletedAt = Date.now();
    } else {
      this.updatedAt = Date.now();
    }
  }
}
