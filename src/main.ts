import { config } from 'dotenv'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // Starting RabbitMQ microservice
  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.REDIS,
      options: {
        host: 'localhost',
        port: 6379,
      },
    })

  // Validator
  app.useGlobalPipes(new ValidationPipe())
  microservice.useGlobalPipes(new ValidationPipe())

  microservice.listen()
  // Loading Swagger
  const config = new DocumentBuilder()
    .setTitle('Microshop')
    .setDescription('Shop api swagger')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(8001)
  console.log('server started at %s', await app.getUrl())
}

bootstrap()
