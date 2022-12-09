import { CacheModule, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { AuthPass } from './entities/auth-pass.entity'
import { AuthEntity } from './entities/auth.entity'
import { ProductModule } from './product/product.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_MONGO),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [AuthEntity, AuthPass],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ProductModule,
    AuthModule,
  ],
})
export class AppModule {}
