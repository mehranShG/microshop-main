import { config } from 'dotenv'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'

config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBIT],
        queue: 'main_queue',
        queueOptions: {
          durable: false,
        },
      },
    })
  microservice.listen()
  await app.listen(8001)
  console.log('server started at %s', await app.getUrl())
}

bootstrap()
