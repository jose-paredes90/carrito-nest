import { Shopping } from '../entities/shopping';

export interface ShoppingRepositoryInterface {
  get(): Promise<Shopping[]>;
  create(entity: Shopping): Promise<Shopping>;
}
