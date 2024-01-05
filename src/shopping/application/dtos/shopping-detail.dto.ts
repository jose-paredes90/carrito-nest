import { ApiProperty } from "@nestjs/swagger";
export class ShoppingDetailDTO {
    @ApiProperty()
    productId: number;
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    price: number;
}