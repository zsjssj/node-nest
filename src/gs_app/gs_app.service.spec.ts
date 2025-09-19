import { Test, TestingModule } from '@nestjs/testing';
import { GsAppService } from './gs_app.service';

describe('GsAppService', () => {
  let service: GsAppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GsAppService],
    }).compile();

    service = module.get<GsAppService>(GsAppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
