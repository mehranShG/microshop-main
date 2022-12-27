import { OrderDto } from 'src/dtos/order.dto'
import { AuthEntity } from 'src/entities/auth.entity'
import { OrdersEntity } from 'src/entities/orders.entity'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
  ) {}

  // TODO jwt user id
  async getOrder() {
    const user = await this.authRepository.findOne({ where: { id: 1 } })
    return user.orders
  }

  async order(orderDto: OrderDto) {
    const user = await this.authRepository.findOneBy({ id: 1 })
    const order = new OrdersEntity()
    order.product_id = orderDto.product_id
    order.product_name = orderDto.product_name
    order.price = orderDto.price
    order.quantity = orderDto.quantity
    user.orders.push(order)
    const result = await this.authRepository.save(user)
    return result
  }
}
