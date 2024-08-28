import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ApiController } from './api/api.controller'
import { MqpController } from './mqp/mqp.controller'
import { AppService } from './app.service'

@Module({
  imports: [],
  controllers: [AppController, ApiController, MqpController],
  providers: [AppService],
})
export class AppModule {}
