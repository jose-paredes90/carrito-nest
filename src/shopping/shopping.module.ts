import { Module } from '@nestjs/common';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingSchema } from './infraestructura/repository-mysql/schemas/shopping.schema';
import { ShoppingDetailSchema } from './infraestructura/repository-mysql/schemas/shopping-detail.schema';
import { ShoppingController } from './infraestructura/controllers/shopping.controller';
import { ShoppingRepository } from './infraestructura/repository-mysql/repositories/shopping-repository';
import { ShoppingUsecases } from './application/useCases/shopping-usecases/shopping-usecases';

@Module({
  providers: [
    { provide: 'ShoppingUseCases', useClass: ShoppingUsecases },
    { provide: 'ShoppingRepository', useClass: ShoppingRepository },
  ],
  controllers: [ShoppingController],
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'clave',
      database: 'shoppingdb',
      entities: [join(__dirname, '**/**.schema{.ts,.js}')],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ShoppingSchema, ShoppingDetailSchema]),
  ],
})
export class ShoppingModule {}
