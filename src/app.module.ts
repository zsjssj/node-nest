import { Module } from '@nestjs/common'
import { ApiService } from './modules/api/api.service'
import { UserModule } from './user/user.module'
import { ApiModule } from './modules/api/api.module'

@Module({
  imports: [UserModule, ApiModule],
  providers: [ApiService],
})
export class AppModule {}
