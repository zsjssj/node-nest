import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { VersioningType } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'
import * as path from 'path'
import * as session from 'express-session'

import type { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const port = process.env.SERVER_PORT
  const ip = process.env.SERVER_HOST
  // app.enableVersioning({ type: VersioningType.URI })
  // app.setGlobalPrefix('api')

  app.use(cookieParser()) // 使用 cookie-parser 中间件
  app.use(
    session({
      secret: 'ssje',
      rolling: true,
      name: 'ssje_jwt',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
    }),
  )

  app.useStaticAssets(path.join(__dirname, '..', 'public'), {
    prefix: '/static/',
    maxAge: 1000 * 60 * 60 * 24 * 30,
  })

  app.useStaticAssets(path.join(__dirname, '..', 'public/map'), {
    prefix: '/map/',
    maxAge: 1000 * 60 * 60 * 24 * 30,
  })

  await app.listen(port, ip)
  const url = await app.getUrl()
  console.log(`server服务地址: ${url}`)
}
bootstrap()

//"start:dev": "cross-env NODE_ENV=development nest start --watch",
