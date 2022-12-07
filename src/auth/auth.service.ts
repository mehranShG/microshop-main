import * as bcrypt from 'bcrypt'
import { catchError, from, map, Observable } from 'rxjs'
import { LoginDto } from 'src/dtos/login.dto'
import { AuthEntity } from 'src/entities/auth.entity'
import { Repository } from 'typeorm'
import {
    ConflictException, Injectable, NotFoundException, UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
    private readonly jwtService: JwtService,
  ) {}

  register(authEntity: AuthEntity): Observable<Object> {
    return from(this.authRepository.save(authEntity)).pipe(
      map((user) => {
        return {
          username: user.username,
          email: user.email,
          token: this.jwtService.sign({ id: user.id, expiresIn: '1h' }),
        }
      }),
      catchError((err) => {
        throw new ConflictException()
      }),
    )
  }

  async login(loginDto: LoginDto): Promise<Object | NotFoundException> {
    const findUser = await this.authRepository.findOne({
      where: { email: loginDto.email },
    })
    if (!findUser) {
      return new NotFoundException()
    }
    const hashedPassword = findUser.authPass.password
    const validate = await bcrypt.compare(loginDto.password, hashedPassword)
    if (!validate) {
      throw new UnauthorizedException()
    }
    const user_token = await this.jwtService.signAsync({
      id: findUser.id,
      expiresIn: '1h',
    })
    return { id: findUser.id, token: user_token }
  }

  async findById(id: number): Promise<AuthEntity> {
    return this.authRepository.findOne({ where: { id } })
  }
}
