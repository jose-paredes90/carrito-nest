import { ApiProperty } from "@nestjs/swagger";
export class ShoppingDetailDTO {
    @ApiProperty()
    id: number
    @ApiProperty()
    productId: string;
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    price: number;
}