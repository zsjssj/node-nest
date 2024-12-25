import { Controller, Get, Post } from '@nestjs/common'
import { UserService } from './user.service'
import type { response } from '@/type'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUser(): response<string> {
    return { data: 'Hello World!', msg: 'ok' }
  }
  @Post('login')
  login(): response<string> {
    return { data: 'js-jwt,', msg: 'ok' }
  }
}
