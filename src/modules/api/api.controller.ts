import { Controller, Get, Param, Query } from '@nestjs/common'
import { AppService } from '../../app.service'
import { ApiService } from './api.service'
import { GetTestQueryDto } from '../../dto/get-query.dto'
import type { response } from '../../type'

@Controller('/api')
export class ApiController {
  constructor(
    private readonly appService: AppService,
    private readonly apiService: ApiService,
  ) {}

  @Get()
  getHello(): response<string> {
    return this.appService.getHello()
  }
  @Get('/test1/:data')
  getTestParam(@Param('data') data: number): response<string> {
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
