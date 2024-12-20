import { Controller, Get, Post } from '@nestjs/common'
import { AppService } from './app.service'
import type { response } from './type'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): response<string> {
    return this.appService.getHello()
  }

  @Post('/test')
  postTest(): response<string[]> {
    this.appService.postTest()
    return { data: [this.appService.postTest(), '这是根目录测试的回复!'], msg: 'ok' }
  }
}
