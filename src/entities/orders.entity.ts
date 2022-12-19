import {
    Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm'
import { AuthEntity } from './auth.entity'
import { CartEntity } from './cart.entity'

@Entity()
export class OrdersEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Column({ default: false })
  paid: boolean

  @ManyToOne(() => AuthEntity, (auth) => auth.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  auth: AuthEntity

  @OneToMany(() => CartEntity, (cart) => cart.order_id, {
    eager: true,
  })
  cart: CartEntity[]
}
