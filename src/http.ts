import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerDocument, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app: NestFastifyApplication = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const logger: Logger = new Logger();
  app.useLogger(logger);

  const options: DocumentBuilder = new DocumentBuilder()
    .setTitle('Welcome')
    .setDescription('The welcome app API description')
    .setVersion('1.0')
    .setBasePath('/api/')
    .addTag('interview')
    .addBearerAuth()
  ;
  const document: SwaggerDocument = SwaggerModule.createDocument(app, options.build());
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(
    3000,
    '0.0.0.0',
    () => logger.log(`Interview app started at port [3000]`, 'NestApplication'),
  );
}
bootstrap().then();
