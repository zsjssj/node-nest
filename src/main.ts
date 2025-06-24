import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import * as path from 'path';

//指定静态资源地址
type InitStaticAssetsParams = { app: NestExpressApplication; pathName: string; maxAge: number };
function initStaticAssets({ app, pathName, maxAge }: InitStaticAssetsParams) {
  app.useStaticAssets(path.join(__dirname, '..', pathName), {
    prefix: '/static/',
    maxAge: maxAge,
  });
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); //NestExpressApplication: 指定创建NestExpress应用
  app.enableCors(); // 允许跨域
  app.setGlobalPrefix('api'); // 设置全局前缀为 /api
  app.useGlobalFilters(new HttpExceptionFilter()); // 注册全局异常过滤器
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

  initStaticAssets({ app, pathName: '/public', maxAge: 1000 * 60 * 60 * 24 * 30 }); // 初始化静态资源地址
  initStaticAssets({ app, pathName: '/public/map', maxAge: 1000 * 60 * 60 * 24 * 30 }); // 初始化地图静态资源地址

  const config = new DocumentBuilder().setTitle('api文档').setDescription('用户管理文档').setVersion('1.0').addServer('/api/v1', 'V1 版本').addTag('用户管理').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  let port = process.env.PORT || 3000;
  await app.listen(port, '127.0.0.1');
  const url = await app.getUrl();
  console.log(`server服务运行在: ${url}`);
}
bootstrap();
