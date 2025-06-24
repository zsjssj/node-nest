import { Test, TestingModule } from '@nestjs/testing';
import { PostgreSqlController } from './postgre-sql.controller';
import { PostgreSqlService } from './postgre-sql.service';

describe('PostgreSqlController', () => {
  let controller: PostgreSqlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostgreSqlController],
      providers: [PostgreSqlService],
    }).compile();

    controller = module.get<PostgreSqlController>(PostgreSqlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
