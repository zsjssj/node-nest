import { Module } from '@nestjs/common';
import { GsAppService } from './gs_app.service';
import { GsAppController } from './gs_app.controller';

@Module({
  controllers: [GsAppController],
  providers: [GsAppService],
})
export class GsAppModule {}
