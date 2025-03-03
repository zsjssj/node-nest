import { Test, TestingModule } from '@nestjs/testing'
import { PostgreSqlService } from './postgre-sql.service'

describe('PostgreSqlService', () => {
  let service: PostgreSqlService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostgreSqlService],
    }).compile()

    service = module.get<PostgreSqlService>(PostgreSqlService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
