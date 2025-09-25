import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Cappuccino' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 250.0 })
  @IsNumber()
  @IsPositive()
  price: number;
}
