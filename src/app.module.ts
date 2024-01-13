import { Module } from '@nestjs/common';
import { ShoppingModule } from './shopping/shopping.module';

@Module({
  imports: [ShoppingModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
