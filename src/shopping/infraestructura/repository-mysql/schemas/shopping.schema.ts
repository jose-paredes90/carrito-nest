import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ShoppingDetailSchema } from './shopping-detail.schema';
@Entity({ name: 'shopping' })
export class ShoppingSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: false, length: 50 })
  customerId: string;

  @Column({ type: String, nullable: false })
  date: Date;

  @OneToMany(() => ShoppingDetailSchema, (detail) => detail.shopping, {
    cascade : true,
    })
  details: ShoppingDetailSchema[];
}
