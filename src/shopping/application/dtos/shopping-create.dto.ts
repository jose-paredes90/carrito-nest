import { ApiProperty } from '@nestjs/swagger';
import { ShoppingDetailCreateDTO } from './shopping-detail-create.dto';
export class ShoppingCreateDTO {
  @ApiProperty()
  customerId: string;
  @ApiProperty()
  date: Date;
  @ApiProperty({
    type: () => ShoppingDetailCreateDTO,
    isArray: true,
  })
  details: ShoppingDetailCreateDTO[];
}
