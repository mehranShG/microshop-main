import { Observable } from 'rxjs'
import { ResponseModel } from 'src/interface/response.model'
import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { ApiTags } from '@nestjs/swagger'
import { LoginDto } from '../dtos/login.dto'
import { RegisterDto } from '../dtos/register.dto'
import { AuthPass } from '../entities/auth-pass.entity'
import { AuthEntity } from '../entities/auth.entity'
import { AuthService } from './auth.service'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @MessagePattern({ name: 'auth_register' })
  Register(@Body() registerDto: RegisterDto): Observable<ResponseModel> {
    const user = new AuthEntity()
    user.username = registerDto.username
    user.email = registerDto.email
    const authPass = new AuthPass()
    authPass.password = registerDto.password
    user.authPass = authPass
    return this.authService.register(user)
  }

  @Post('login')
  @MessagePattern({ name: 'auth_login' })
  login(@Body() login: LoginDto): Promise<ResponseModel | NotFoundException> {
    return this.authService.login(login)
  }

  @Get()
  @MessagePattern({ name: 'find_by_id' })
  getUserByID(id: number): Promise<ResponseModel> {
    return this.authService.findById(id)
  }

  @Get('users')
  async getAllUsers(): Promise<AuthEntity[]> {
    return this.authService.getAllUsers()
  }
}
