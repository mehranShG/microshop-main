import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBIT],
        queue: 'main_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  )
  app.listen()
}
/*const app = await NestFactory.create(AppModule)
  await app.listen(8001)
  console.log('connected at %s', await app.getUrl())
}*/
bootstrap()
