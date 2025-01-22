import { Module } from '@nestjs/common'
import { ApiService } from './modules/api/api.service'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ApiModule } from './modules/api/api.module'
import { UserModule } from './user/user.module'
import * as Joi from 'joi'
import * as path from 'path'
import { AppController } from './app.controller'

const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`

@Module({
  controllers: [AppController],
  imports: [
    ApiModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production').default('development'),
        DB: Joi.string().required(),
        SERVER_URL: Joi.string(),
        SERVER_PORT: Joi.number().default(3000),
      }),
    }),
    // // 配置不同路径下的静态资源
    // ServeStaticModule.forRoot({
    //   rootPath: path.join(__dirname, '..', 'public'), // 默认静态资源
    //   serveRoot: '/static', // 对应的路由
    // }),
    // ServeStaticModule.forRoot({
    //   rootPath: path.join(__dirname, '..', 'public/map'), // 第二个静态资源
    //   serveRoot: '/map', // 对应的路由
    // }),
  ],

  providers: [ApiService],
})
export class AppModule {}
