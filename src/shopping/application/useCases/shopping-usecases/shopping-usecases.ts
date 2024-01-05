import { Inject } from '@nestjs/common';
import { ShoppingUseCasesPort } from '../../useCasesPort/shopping-usecases.port';
import { ShoppingRepositoryInterface } from 'src/shopping/domain/repositories/shopping-repository.interface';
import { ShoppingCreateDTO } from '../../dtos/shopping-create.dto';
import { ShoppingDTO } from '../../dtos/shopping.dto';
import { ShoppingDetail } from 'src/shopping/domain/entities/shopping-detail';
import { Shopping } from 'src/shopping/domain/entities/shopping';

export class ShoppingUsecases implements ShoppingUseCasesPort {
    constructor(
        @Inject('ShoppingRepository')
        private readonly shoppingRepository: ShoppingRepositoryInterface,
    ) { }
    public async getShopping(): Promise<ShoppingDTO[]> {
        const response = await this.shoppingRepository.get();
        return response.map((item) => {
            return {
                id: item.id,
                customerId: item.customerId,
                date: item.date,
                details: item.details?.map((det) => {
                    return {
                        price: det.price,
                        productId: det.productId,
                        quantity: det.quantity,
                    } as ShoppingDetail;
                }),
            } as ShoppingDTO;
        });
    }

    public async createShopping(dto: ShoppingCreateDTO): Promise<ShoppingDTO> {
        
        const body = new Shopping();
        body.customerId = dto.customerId;
        body.date = new Date();

        const details: ShoppingDetail[] = dto.details.map((item) => {
            return {
                productId: item.productId,
                price: item.price,
                quantity: item.quantity,
            } as ShoppingDetail;
        });
        body.details = details;
        const response = await this.shoppingRepository.create(body);
        return response;
    }
}
