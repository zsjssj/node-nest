import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ApiController } from './modules/api/api.controller'
import { AppService } from './app.service'
import { ApiService } from './modules/api/api.service'

@Module({
  imports: [],
  controllers: [AppController, ApiController],
  providers: [AppService, ApiService],
})
export class AppModule {}
