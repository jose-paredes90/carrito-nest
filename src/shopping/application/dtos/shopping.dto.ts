import { ShoppingDetailDTO } from './shopping-detail.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ShoppingDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  customerId: string;
  @ApiProperty()
  date: Date;
  @ApiProperty()
  details: ShoppingDetailDTO[];
}
