import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Configuration } from './config/config.key';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
