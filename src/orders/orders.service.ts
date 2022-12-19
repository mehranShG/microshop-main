import { OrderDto } from 'src/dtos/order.dto'
import { AuthEntity } from 'src/entities/auth.entity'
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

  async order(orderDtp: OrderDto) {
    const user = await this.authRepository.findOne({ where: { id: 1 } })
    if (user.orders.length === 0) {
    }
  }
}
