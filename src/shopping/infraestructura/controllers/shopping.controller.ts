import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { ClientKafka} from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { ShoppingCreateDTO } from "src/shopping/application/dtos/shopping-create.dto";
import { ShoppingUseCasesPort } from "src/shopping/application/useCasesPort/shopping-usecases.port";

@ApiTags("shopping")
@Controller('shopping')
export class ShoppingController {

    constructor(
    @Inject('ShoppingUseCases')private readonly shoppingUseCasesPort: ShoppingUseCasesPort,
    @Inject('SHOPPING_EVENT') private readonly kafkaClient: ClientKafka) { }

    async onModuleInit() {
        ['shopping-create'].forEach((key) => this.kafkaClient.subscribeToResponseOf(`${key}`));
        await this.kafkaClient.connect();
      }

    @Get()
    public async get() {
        return await this.shoppingUseCasesPort.getShopping();
    }

    @Post()
    public async create(@Body() body: ShoppingCreateDTO) {
        const response =  await this.shoppingUseCasesPort.createShopping(body);
        if (response) {
            this.kafkaClient.emit('shopping-create', response);
        }

        return response;
    }
}