import { Module } from '@nestjs/common';
import { IceApiService } from './ice-api.service';
import { IceApiController } from './ice-api.controller';

@Module({
  controllers: [IceApiController],
  providers: [IceApiService],
})
export class IceApiModule {}
