import { AuthEntity } from 'src/entities/auth.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrdersController } from './orders.controller'
import { OrdersService } from './orders.service'

@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
