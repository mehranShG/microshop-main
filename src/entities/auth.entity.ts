import {
    Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'
import { AuthPass } from './auth-pass.entity'
import { OrdersEntity } from './orders.entity'

@Entity()
export class AuthEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column({ unique: true })
  email: string

  @Column({ nullable: true })
  first_name: string

  @Column({ nullable: true })
  last_name: string

  @Column({ nullable: true })
  phone_number: string

  @Column({ nullable: true })
  address: string

  @Column({ nullable: true })
  profile_image: string

  @CreateDateColumn()
  created_time: Date

  @UpdateDateColumn()
  updated_time: Date

  @OneToOne(() => AuthPass, (authPass) => authPass.id, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  authPass: AuthPass

  @OneToMany(() => OrdersEntity, (order) => order.auth, { eager: true })
  orders: OrdersEntity[]
}
