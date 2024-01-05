import { ShoppingDetail } from './shopping-detail';

export class Shopping {
  id: number;
  customerId: string;
  date: Date;
  details: ShoppingDetail[];
}
