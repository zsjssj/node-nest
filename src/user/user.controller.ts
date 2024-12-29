import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, Session } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { log } from 'console'

@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Get()
  findAll() {
    return this.userService.findAll()
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id)
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id)
  // }

  @Get('code')
  createCode(@Req() req, @Res() res, @Session() session) {
    const captcha = this.userService.createCode()
    session.code = captcha.text
    res.type('image/svg+xml')
    res.send(captcha.data)
  }

  @Post('create')
  createUser(@Body() body, @Session() session) {
    console.log(body, session.code)
    return { msg: 'ok', code: 200 }
  }
}
