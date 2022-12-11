import * as bcrypt from 'bcrypt'
import { catchError, from, map, Observable } from 'rxjs'
import { Repository } from 'typeorm'
import {
    ConflictException, Injectable, NotFoundException, UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { LoginDto } from '../dtos/login.dto'
import { AuthEntity } from '../entities/auth.entity'
import { ResponseModel } from '../interface/response.model'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Resgister
   * @param authEntity requires username,email and password
   * @returns ResponseModel
   */
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

  /**
   * Login
   * @param loginDto requires email and password
   * @returns ResponseModel
   */
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

  /**
   * Find user
   * used by jwt.strategy
   * @param id
   * @returns
   */
  async findById(id: number): Promise<ResponseModel> {
    const foundUser = await this.authRepository.findOne({ where: { id: 1 } })
    console.log(foundUser)
    return {
      success: true,
      result: foundUser,
      code: 200,
    }
  }

  async getAllUsers(): Promise<AuthEntity[]> {
    return this.authRepository.find()
  }
}
