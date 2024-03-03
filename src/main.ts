import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200', // o '*' para permitir cualquier origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // habilitar credenciales (si es necesario)
  });
  const microservices = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:29092'],
        },
        consumer: {
          groupId: 'kafka-shopping-consumer-nest',
        },
        subscribe: {
          fromBeginning: true
        }
      },
    },
  );

  await microservices.listen();
  await app.startAllMicroservices();

  const config = new DocumentBuilder()
    .setTitle('Shopping API')
    .setDescription('The shopping API description')
    .setVersion('1.0')
    .addTag('shopping')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  
  await app.listen(3000);
}

bootstrap();
