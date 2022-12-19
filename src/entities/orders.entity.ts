import {
    Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm'
import { AuthEntity } from './auth.entity'

@Entity()
export class OrdersEntity {
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

  @Column({ default: false })
  paid: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @ManyToOne(() => AuthEntity, (auth) => auth.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  auth: AuthEntity
}
