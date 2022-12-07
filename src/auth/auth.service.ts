import * as bcrypt from 'bcrypt'
import { catchError, from, map, Observable } from 'rxjs'
import { LoginDto } from 'src/dtos/login.dto'
import { AuthEntity } from 'src/entities/auth.entity'
import { ResponseModel } from 'src/interface/response.model'
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

  register(authEntity: AuthEntity): Observable<ResponseModel> {
    return from(this.authRepository.save(authEntity)).pipe(
      map((user) => {
        return {
          success: true,
          result: {
            username: user.username,
            email: user.email,
            token: this.jwtService.sign({ id: user.id, expiresIn: '1h' }),
          },
          code: 201,
        }
      }),
      catchError((err) => {
        throw new ConflictException()
      }),
    )
  }

  async login(loginDto: LoginDto): Promise<ResponseModel | NotFoundException> {
    const findUser = await this.authRepository.findOne({
      where: { email: loginDto.email },
    })
    if (!findUser) {
      return new NotFoundException()
    }
    const hashedPassword = findUser.authPass.password
    const validate = await bcrypt.compare(loginDto.password, hashedPassword)
    if (!validate) {
      return new UnauthorizedException()
    }
    const user_token = await this.jwtService.signAsync({
      id: findUser.id,
      expiresIn: '1h',
    })
    return {
      success: true,
      result: { id: findUser.id, token: user_token },
      code: 200,
    }
  }

  async findById(id: number): Promise<AuthEntity> {
    return this.authRepository.findOne({ where: { id: 1 } })
  }
}
