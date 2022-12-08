import { validate } from 'class-validator'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from './auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '1234',
    })
  }
  async validate(payload: any): Promise<Object> {
    const user = await this.authService.findById(payload.id)
    if (!user) {
      throw new UnauthorizedException()
    }
    return { user: user.id, username: user.username }
  }
}
