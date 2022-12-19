import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
}
