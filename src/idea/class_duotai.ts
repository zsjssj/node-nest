import { type } from 'os'

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

console.log(' typeof loginMap', typeof loginMap)

function loginFactory(type: keyof typeof loginMap) {
  return new loginMap[type]()
}
loginFactory('dingTalk').login()
