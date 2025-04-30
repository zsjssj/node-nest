import { Test, TestingModule } from '@nestjs/testing';
import { IceApiController } from './ice-api.controller';
import { IceApiService } from './ice-api.service';

describe('IceApiController', () => {
  let controller: IceApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IceApiController],
      providers: [IceApiService],
    }).compile();

    controller = module.get<IceApiController>(IceApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
