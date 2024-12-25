import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import type { NestExpressApplication } from '@nestjs/platform-express'
import { promises } from 'dns'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const port = process.env.PORT || 3001
  app.setGlobalPrefix('api/v1')
  const ip = process.env.IP || '127.0.0.1'
  await app.listen(port, ip)
  console.log(`server服务地址: ${await app.getUrl()}`)
}
bootstrap()

function login(phone: string) {
  return `${phone} login success`
}
abstract class baseLogin {
  abstract getUserInfo(): Promise<{ phone: string }>
  async login(): Promise<void> {
    const userInfo = await this.getUserInfo()
    const token = login(userInfo.phone)
    this.afterLogin(token)
  }
  private afterLogin(token: string) {
    console.log(`登录成功 token: ${token} 保存本地`)
  }
}

class DingTalkLogin extends baseLogin {
  override async getUserInfo() {
    //获取钉钉的用户信息
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('获取钉钉的用户信息...')
    return { phone: '123456789' }
  }
}

//企微登录
class WeChatLogin extends baseLogin {
  override async getUserInfo() {
    //获取企微的用户信息
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('获取企微的用户信息...')
    return { phone: '987654321' }
  }
}

const loginMap = {
  dingTalk: DingTalkLogin,
  weChat: WeChatLogin,
}
function loginFactory(type: keyof typeof loginMap) {
  return new loginMap[type]()
}
loginFactory('dingTalk').login()
