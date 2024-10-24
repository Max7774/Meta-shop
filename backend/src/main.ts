import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: false,
  });

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  app.use('/receipts', express.static(join(__dirname, '..', 'receipts')));

  app.setGlobalPrefix('api');
  app.enableCors({ credentials: true, origin: true });

  const version = process.env.APP_VERSION;

  const config = new DocumentBuilder()
    .setTitle('AgroZakupKz Shop')
    .setDescription('AgroZakupKz shop API')
    .setVersion(version)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addBasicAuth(
      {
        type: 'http',
        scheme: 'basic',
        description: 'Basic auth for logging in with username and password',
      },
      'basic-auth', // Название схемы для basic auth
    )
    .addSecurityRequirements('JWT-auth')
    .addSecurityRequirements('basic-auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);

  await app.listen(3000);
}
bootstrap();
