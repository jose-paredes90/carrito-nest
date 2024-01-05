import { ApiProperty } from "@nestjs/swagger";

export class ShoppingDetailCreateDTO {
    @ApiProperty()
    productId: number;
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    price: number;
}