import { LoginDto } from 'src/dtos/login.dto'
import { RegisterDto } from 'src/dtos/register.dto'
import { AuthPass } from 'src/entities/auth-pass.entity'
import { AuthEntity } from 'src/entities/auth.entity'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @MessagePattern({ name: 'auth_register' })
  Register(@Body() registerDto: RegisterDto) {
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
  login(@Body() login: LoginDto) {
    return this.authService.login(login)
  }

  @Get()
  @MessagePattern({ name: 'find_by_id' })
  getUserByID(id: number) {
    return this.authService.findById(id)
  }
}
