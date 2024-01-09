import { ApiProperty } from "@nestjs/swagger";

export class ShoppingDetailCreateDTO {
    @ApiProperty()
    productId: string;
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    price: number;
}