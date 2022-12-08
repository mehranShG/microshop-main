import { config } from 'dotenv'
import { AuthPass } from 'src/entities/auth-pass.entity'
import { AuthEntity } from 'src/entities/auth.entity'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'

config()

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity, AuthPass]),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
