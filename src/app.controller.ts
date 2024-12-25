import { Controller, Get } from '@nestjs/common'
import type { response } from './type'

@Controller()
export class AppController {
  @Get('/')
  getHello(): response<string> {
    return { msg: 'ok', data: 'Hello World!' }
  }
}
