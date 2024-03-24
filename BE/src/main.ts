import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { configSwagger } from './configs/api-docs.config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );
  configSwagger(app);
  await app.listen(3001);
}
bootstrap();
