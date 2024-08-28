import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import type { response } from './type';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): response<string> {
    return this.appService.getHello();
  }
}
