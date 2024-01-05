import { ShoppingCreateDTO } from '../dtos/shopping-create.dto';
import { ShoppingDTO } from '../dtos/shopping.dto';

export interface ShoppingUseCasesPort {
  getShopping(): Promise<ShoppingDTO[]>;
  createShopping(dto: ShoppingCreateDTO): Promise<ShoppingDTO>;
}
