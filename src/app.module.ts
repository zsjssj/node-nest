import { Module } from '@nestjs/common'
import { ApiService } from './modules/api/api.service'
import { UserModule } from './user/user.module'
import { ConfigModule } from '@nestjs/config'
import { ApiModule } from './modules/api/api.module'

@Module({
  imports: [UserModule, ApiModule, ConfigModule.forRoot({ isGlobal: true })],

  providers: [ApiService],
})
export class AppModule {}
