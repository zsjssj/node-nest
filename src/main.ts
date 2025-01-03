import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { VersioningType } from '@nestjs/common'
import * as path from 'path'
import * as session from 'express-session'

import type { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const port = process.env.SERVER_PORT
  const ip = process.env.SERVER_HOST

  app.enableVersioning({ type: VersioningType.URI })
  app.setGlobalPrefix('api')
  app.useStaticAssets(path.join(__dirname, '..', 'public'), {
    prefix: '/static/',
  })
  app.use(session({ secret: 'ssje', rolling: true, name: 'ssje.sid', cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 } }))
  app.useStaticAssets(path.join(__dirname, '..', 'public/map'), {
    prefix: '/map',
    maxAge: 1000 * 60 * 60 * 24 * 30,
  })

  await app.listen(port, ip)
  console.log(`server服务地址: ${await app.getUrl()}`)
}
bootstrap()
