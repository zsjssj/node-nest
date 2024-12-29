import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import * as svgCaptcha from 'svg-captcha'

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user'
  }

  findAll() {
    return `This action returns all user`
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }

  //创建验证码
  createCode() {
    const captcha = svgCaptcha.create({ size: 4, ignoreChars: '0o1i', noise: 2, color: true, fontSize: 50, width: 100, height: 40, background: '#cc9966' })
    return captcha
  }
}
