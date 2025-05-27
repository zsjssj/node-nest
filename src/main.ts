import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import type { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.SERVER_PORT ?? 3000;
  // const ip = process.env.SERVER_HOST ?? '0.0.0.0';
  const ip = '0.0.0.0';

  // 注册全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  app.setGlobalPrefix('api'); // 设置全局前缀为 /api
  // 启用 URI 版本控制（如 /v1/xxx）
  app.enableVersioning({
    type: VersioningType.URI, // 使用 URI 标识版本
    defaultVersion: '1', // 默认版本（可选）
    prefix: 'v', // 版本前缀（如 /v1/xxx）
  });

  // 注册全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 去除在验证类中不存在的属性
      transform: true, // 自动转换类型
      forbidNonWhitelisted: true, // 禁止在验证类中不存在的属性
    }),
  );
  const config = new DocumentBuilder().setTitle('api文档').setDescription('用户管理文档').setVersion('1.0').addServer('/api/v1', 'V1 版本').addTag('用户管理').build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.useStaticAssets(path.join(__dirname, '..', 'public'), {
    prefix: '/static/',
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });

  app.useStaticAssets(path.join(__dirname, '..', 'public/map'), {
    prefix: '/map/',
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });

  await app.listen(port, '10.210.200.109');
  const url = await app.getUrl();
  console.log(`server服务地址: ${url}`);
}
bootstrap();
