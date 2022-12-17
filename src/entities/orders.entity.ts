import {
    CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm'
import { AuthEntity } from './auth.entity'

@Entity()
export class OrdersEntity {
  @PrimaryGeneratedColumn()
  id: number

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
