import { Controller, Get } from '@nestjs/common';
import { AppService } from '../app.service';
import type { response } from '../type';

@Controller('/api')
export class ApiController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): response<string> {
    return this.appService.getHello();
  }
  @Get('/test1')
  getTest(): string {
    // return this.appService.getTest();
    return '这是测试的回复!';
  }
}
