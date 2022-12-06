import {
    Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm'
import { AuthPass } from './auth-pass.entity'

@Entity()
export class AuthEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  email: string

  @CreateDateColumn()
  created_time: Date

  @UpdateDateColumn()
  updated_time: Date

  @OneToOne(() => AuthPass, (authPass) => authPass.id)
  authPass: AuthPass
}
