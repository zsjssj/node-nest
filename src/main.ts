import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import type { NestExpressApplication } from '@nestjs/platform-express'
import './testIdea/class_duotai'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const port = process.env.PORT || 3001
  app.setGlobalPrefix('api/v1')
  const ip = process.env.IP || '127.0.0.1'
  await app.listen(port, ip)
  console.log(`server服务地址: ${await app.getUrl()}`)
}
bootstrap()
