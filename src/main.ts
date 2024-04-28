import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { getSwaggerDocument } from './swagger';
import { ValidationPipe } from '@nestjs/common';

const PORT = 5555;

(async () => {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3002',
      'https://co-workers-fe.vercel.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });
  app.useGlobalPipes(new ValidationPipe());

  SwaggerModule.setup('api/v1/docs', app, getSwaggerDocument(app));

  await app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/api/v1`);
  });
})();
