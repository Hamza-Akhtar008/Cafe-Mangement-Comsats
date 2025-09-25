import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

class InvoiceItemDto {
  @ApiProperty({ example: 1, description: 'ID of the product' })
  @IsInt()
  productId: number;

  @ApiProperty({ example: 2, description: 'Quantity of this product' })
  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateInvoiceDto {
  @ApiProperty({
    type: [InvoiceItemDto],
    example: [
      { productId: 1, quantity: 2 },
      { productId: 3, quantity: 1 },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemDto)
  items: InvoiceItemDto[];
}
