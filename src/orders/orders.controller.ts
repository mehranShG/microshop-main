import { OrderDto } from 'src/dtos/order.dto'
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { OrdersService } from './orders.service'

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getOrder() {
    return this.ordersService.getOrder()
  }

  @Post()
  order(@Body() orderDto: OrderDto) {
    return this.ordersService.order(orderDto)
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: number) {
    return this.ordersService.deleteOrder(id)
  }
}
