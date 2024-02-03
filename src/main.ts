import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { getSwaggerDocument } from './swagger';

(async () => {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  SwaggerModule.setup('api/v1/docs', app, getSwaggerDocument(app));

  await app.listen(5555, () => {
    console.log('Server is running on http://localhost:5555/api/v1');
  });
})();
