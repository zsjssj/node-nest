import { Injectable } from '@nestjs/common'
import type { response } from './type'

@Injectable()
export class AppService {
  getHello(): response<string> {
    return { msg: 'ok', data: 'Hello World!' }
  }
  getTest(): string {
    return '这是测试的回复!'
  }
}

export const generateRandomString = (length: number): string => {
  let result: string = ''
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let charactersLength = characters.length
  for (let i = 0; i < Number(length); i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
