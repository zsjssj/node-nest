import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ApiController } from './modules/api/api.controller'
import { AppService } from './app.service'
import { ApiService } from './modules/api/api.service'
import { UserModule } from './user/user.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [UserModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController, ApiController],
  providers: [AppService, ApiService],
})
export class AppModule {}
