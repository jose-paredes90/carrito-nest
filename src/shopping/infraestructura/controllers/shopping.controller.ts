import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ShoppingCreateDTO } from "src/shopping/application/dtos/shopping-create.dto";
import { ShoppingUseCasesPort } from "src/shopping/application/useCasesPort/shopping-usecases.port";

@ApiTags("shopping")
@Controller('shopping')
export class ShoppingController {

    constructor(@Inject('ShoppingUseCases')
    private readonly shoppingUseCasesPort: ShoppingUseCasesPort) { }

    @Get()
    public async get() {
        return await this.shoppingUseCasesPort.getShopping();
    }

    @Post()
    public async create(@Body() body: ShoppingCreateDTO) {
        return await this.shoppingUseCasesPort.createShopping(body);
    }
}