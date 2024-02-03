import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

(async () => {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  await app.listen(5555, () => {
    console.log('Server is running on http://localhost:5555/api/v1');
  });
})();
