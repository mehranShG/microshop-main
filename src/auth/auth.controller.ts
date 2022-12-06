import { RegisterDto } from 'src/dtos/register.dto'
import { AuthPass } from 'src/entities/auth-pass.entity'
import { AuthEntity } from 'src/entities/auth.entity'
import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  Register(@Body() registerDto: RegisterDto) {
    const user = new AuthEntity()
    user.username = registerDto.username
    user.email = registerDto.email
    const authPass = new AuthPass()
    authPass.password = registerDto.password
    user.authPass = authPass
    return this.authService.register(user)
  }
}
