import { Module } from '@nestjs/common'
import { ApiService } from './modules/api/api.service'
import { ConfigModule } from '@nestjs/config'
import { ApiModule } from './modules/api/api.module'
import { UserModule } from './user/user.module'
import * as Joi from 'joi'
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
  ],

  providers: [ApiService],
})
export class AppModule {}
