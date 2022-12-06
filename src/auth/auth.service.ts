import * as bcrypt from 'bcrypt'
import { from, Observable } from 'rxjs'
import { LoginDto } from 'src/dtos/login.dto'
import { AuthEntity } from 'src/entities/auth.entity'
import { Repository } from 'typeorm'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
  ) {}

  register(authEntity: AuthEntity): Observable<AuthEntity> {
    return from(this.authRepository.save(authEntity))
  }

  async login(loginDto: LoginDto): Promise<boolean | NotFoundException> {
    const findUser = await this.authRepository.findOne({
      where: { email: loginDto.email },
    })
    if (!findUser) {
      return new NotFoundException()
    }
    const hashedPassword = findUser.authPass.password
    const validate = bcrypt.compare(loginDto.password, hashedPassword)
    return validate
  }

  async findById(id: number): Promise<AuthEntity> {
    return this.authRepository.findOne({ where: { id } })
  }
}
