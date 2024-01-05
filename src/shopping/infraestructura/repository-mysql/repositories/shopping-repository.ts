import { Shopping } from 'src/shopping/domain/entities/shopping';
import { ShoppingRepositoryInterface } from 'src/shopping/domain/repositories/shopping-repository.interface';
import { Repository } from 'typeorm';
import { ShoppingSchema } from '../schemas/shopping.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingDetail } from 'src/shopping/domain/entities/shopping-detail';

export class ShoppingRepository implements ShoppingRepositoryInterface {
  constructor(
    @InjectRepository(ShoppingSchema)
    private readonly shoppingSchemaRepository: Repository<ShoppingSchema>,
  ) { }

  public async get(): Promise<Shopping[]> {
    const response = await this.shoppingSchemaRepository.find({
      relations: ['details'],
      
    });
    return response.map((item) => {
      return {
        id: item.id,
        customerId: item.customerId,
        date: item.date,
        details: item.details?.map((det) => {
          return {
            productId: det.productId,
            quantity: det.quantity,
            price: det.price,
          } as ShoppingDetail;
        }) || [],
      } as Shopping;
    });
  }

  public async create(body: Shopping): Promise<Shopping> {
    const response = await this.shoppingSchemaRepository.save(body);
    return {
      id: response.id,
      ...body,
    } as Shopping
  }
}
