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

  async getOrder() {
    const user = await this.authRepository.findOne({ where: { id: 1 } })
    return user.orders
  }
}
