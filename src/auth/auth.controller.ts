import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  Register(@Body() registerDto) {
    return this.authService.register(registerDto)
  }
}
