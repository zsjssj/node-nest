import { Module } from '@nestjs/common'
import { ApiService } from './modules/api/api.service'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ApiModule } from './modules/api/api.module'
import { UserModule } from './user/user.module'
import * as Joi from 'joi'
import * as path from 'path'
import { AppController } from './app.controller'
import { PostgreSqlModule } from './postgre-sql/postgre-sql.module'

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
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '521421',
      database: 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 自动加载实体
      synchronize: true, // 生产环境建议关闭
    }),
    PostgreSqlModule,
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
