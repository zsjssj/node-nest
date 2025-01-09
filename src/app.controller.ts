import { Controller, Get } from '@nestjs/common'
import { UserService } from './user/user.service'
import type { response } from './type'

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}
  @Get('/')
  getHello(): response<any> {
    this.userService.createCode()
    return { msg: 'ok', data: 'Hello World!' }
    // return { data: this.userService.createCode(), msg: 'ok' }
  }
}
