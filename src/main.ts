import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as path from 'path'
import type { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const port = process.env.SERVER_PORT || 3000
  const ip = process.env.SERVER_HOST || '127.0.0.1'
  app.setGlobalPrefix('api/v1')

  app.useStaticAssets(path.join(__dirname, '..', 'public'), {
    prefix: '/static/',
  })

  app.useStaticAssets(path.join(__dirname, '..', 'public/map'), {
    prefix: '/map',
    maxAge: 1000 * 60 * 60 * 24 * 30,
  })

  await app.listen(port, ip)
  console.log(`server服务地址: ${await app.getUrl()}`)
}
bootstrap()
