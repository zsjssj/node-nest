import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, Session, HttpStatus } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Request, Response } from 'express'
@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    const msg = this.userService.create(createUserDto)
    return { msg, statusCode: HttpStatus.OK }
  }

  @Get('info')
  findAll() {
    return { msg: this.userService.findAll(), statusCode: HttpStatus.OK }
  }

  @Get('info/:id')
  findOne(@Param('id') id: string) {
    return { msg: this.userService.findOne(+id), statusCode: HttpStatus.OK }
  }

  @Patch('info/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return { msg: this.userService.update(+id, updateUserDto), statusCode: HttpStatus.OK }
  }

  @Delete('info/:id')
  remove(@Param('id') id: string) {
    return { msg: this.userService.remove(+id), statusCode: HttpStatus.OK }
  }

  @Get('code')
  createCode(@Req() req: Request, @Res() res: Response, @Session() session: Record<string, any>) {
    const captcha = this.userService.createCode()
    session.code = captcha.text
    res.type('image/svg+xml')
    res.send(captcha.data)
  }
}
