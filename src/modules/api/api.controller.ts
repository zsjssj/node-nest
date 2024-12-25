import { Controller, Get, Param, Query } from '@nestjs/common'
import { ApiService } from './api.service'
import { GetTestQueryDto } from '../../dto/get-query.dto'
import { ConfigService } from '@nestjs/config'
import type { response } from '../../type'

@Controller('api')
export class ApiController {
  constructor(
    private readonly apiService: ApiService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): response<string> {
    return { data: 'Hello World!', msg: 'ok' }
  }
  @Get('/test1/:data')
  getTestParam(@Param('data') data: number): response<string> {
    console.log('db', this.configService.get('DB'))
    console.log(data)
    return { data: this.apiService.getTest(data), msg: 'ok' }
  }

  @Get('/test2')
  getTestQuerry(@Query() querry: GetTestQueryDto): response<Array<string>> {
    const arr = []
    const length = querry.length
    if (length) {
      for (let i = 0; i < length; i++) {
        arr.push(this.apiService.getTest(querry.data))
      }
    }
    return { data: arr, msg: 'ok' }
  }
}
