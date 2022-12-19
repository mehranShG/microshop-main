import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { OrdersEntity } from './orders.entity'

@Entity()
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  product_id: number

  @Column()
  product_name: string

  @Column()
  quantity: number

  @Column({ type: 'decimal' })
  price: number

  @ManyToOne(() => OrdersEntity, (order) => order.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  order_id: OrdersEntity
}
