import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

import { AppModule } from './app.module';

dotenv.config({ path: '../.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const globalPrefix = configService.get('GLOBAL_PREFIX');

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const docConfig = new DocumentBuilder()
    .setTitle('UdiApi')
    .setDescription('Udi API Reference')
    .setVersion('0.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup(`${globalPrefix}/docs`, app, document);

  const port = configService.get('PORT');
  await app.listen(port);
}
bootstrap();
