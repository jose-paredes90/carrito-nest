import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ShoppingSchema } from './shopping.schema';
@Entity({ name: 'shopping-detail' })
export class ShoppingDetailSchema {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  productId: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => ShoppingSchema, (shopping) => shopping.details)
  shopping: ShoppingSchema;
}
