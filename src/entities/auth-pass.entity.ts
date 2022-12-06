import * as bcrypt from 'bcrypt'
import {
    BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'

@Entity()
export class AuthPass {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  password: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
  }
}
