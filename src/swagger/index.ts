import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('Co-Workers API')
  .setVersion('1.0')
  .build();

const swaggerOptions = {
  ignoreGlobalPrefix: true,
};

export const getSwaggerDocument = (app: INestApplication<unknown>) => {
  const document = SwaggerModule.createDocument(app, config, swaggerOptions);
  return document;
};
