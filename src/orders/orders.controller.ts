import { Controller, Get } from '@nestjs/common'
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
}
