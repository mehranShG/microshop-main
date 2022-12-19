import { ApiProperty } from '@nestjs/swagger'

export class OrderDto {
  @ApiProperty()
  product_id: number

  @ApiProperty()
  product_name: string

  @ApiProperty()
  quantity: number

  @ApiProperty()
  price: number
}
