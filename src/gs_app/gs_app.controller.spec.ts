import { Test, TestingModule } from '@nestjs/testing';
import { GsAppController } from './gs_app.controller';
import { GsAppService } from './gs_app.service';

describe('GsAppController', () => {
  let controller: GsAppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GsAppController],
      providers: [GsAppService],
    }).compile();

    controller = module.get<GsAppController>(GsAppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
