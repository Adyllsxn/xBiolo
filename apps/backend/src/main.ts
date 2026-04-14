import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './presentation/common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global filter para tratamento de erros
  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('BIOLO API')
    .setDescription(
      `
API REST para catálogo digital com finalização no WhatsApp para pequenos negócios em Angola.
Built with NestJS, Prisma ORM v7, and PostgreSQL.

## 🎯 Purpose
Plataforma de comércio conversacional onde o cliente bota na sacolinha e fecha o pedido direto no WhatsApp.
    `,
    )
    .setVersion('1.0')
    .addTag('auth', '🔐 Endpoints de autenticação')
    .addTag('account', '👤 Endpoints de gerenciamento de contas')
    .addTag('password', '🔑 Endpoints de gerenciamento de senha')
    .addTag('categories', '📁 Endpoints de categorias')
    .addTag('products', '🛍️ Endpoints de produtos')
    .addTag('system', '🏥 Endpoints de sistema e monitoramento')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`🚀 Biolo API running on http://localhost:${port}`);
  console.log(`📚 Swagger docs: http://localhost:${port}/api-docs`);
}

bootstrap().catch((err) => {
  console.error('❌ Error starting NestJS app:', err);
});
