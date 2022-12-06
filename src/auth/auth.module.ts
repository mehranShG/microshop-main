import { AuthPass } from 'src/entities/auth-pass.entity'
import { AuthEntity } from 'src/entities/auth.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity, AuthPass])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
