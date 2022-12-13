import { AuthPass } from 'src/entities/auth-pass.entity'
import { AuthEntity } from 'src/entities/auth.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserMicroController } from './user-microservice.controller'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity, AuthPass])],
  controllers: [UserController, UserMicroController],
  providers: [UserService],
})
export class UserModule {}
