import { Controller, Get, Post, Delete, Put, Body, BadRequestException } from '@nestjs/common'
import { AppService, generateRandomString } from '../app.service'
import type { response } from '../type'
import { promises } from 'dns'

enum DeviceState {
  offline,
  online,
}

interface TableData {
  id: string
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
  sn: string
  flag: number | string
  disconnectTimeout: number
  controlPointNum: number
  building?: string
  floor?: string
  [key: string]: any
}
enum DeviceType {
  智能塑壳断路器 = 1,
  智能网络仪表 = 2,
  智能互感器 = 3,
  电能检测单元 = 4,
  智能插座 = 5,
  智能温控器 = 6,
  智能开关 = 7,
  照度温湿度传感器 = 8,
  SPD浪涌监测设备 = 10,
  网络开关 = 11,
  人体存在监测设备 = 12,
}

interface CreateCatDto {
  username: string
  password: string
}
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12]
const arr1 = [1, 2, 3]
const build = ['一栋', '二栋', '三栋', '四栋', '五栋', '六栋', '七栋', '八栋']
const floor = ['一楼', '二楼', '三楼', '四楼', '五楼', '六楼', '七楼', '八楼', '九楼', '十楼']

let tableData: Array<TableData> = []
//随机生成时间
function getRandomPastDate(maxDaysAgo: number): Date {
  const now = new Date()
  const pastDate = new Date(now)
  pastDate.setDate(now.getDate() - Math.floor(Math.random() * maxDaysAgo))
  return pastDate
}

function createList(): Array<TableData> {
  let list: Array<TableData> = []
  for (let i = 0; i < 20; i++) {
    let state = [DeviceState.offline, DeviceState.online]
    const randomStateIndex = Math.floor(Math.random() * state.length)
    const randomBuildIndex = Math.floor(Math.random() * build.length)
    const randomFloorIndex = Math.floor(Math.random() * floor.length)
    list.push({
      id: generateRandomString(32),
      created_at: getRandomPastDate(365),
      updated_at: getRandomPastDate(365),
      deleted_at: getRandomPastDate(365),
      sn: generateRandomString(16),
      flag: arr[Math.floor(Math.random() * arr.length)],
      disconnectTimeout: 0,
      controlPointNum: arr1[Math.floor(Math.random() * arr1.length)],
      // state: state[randomStateIndex],
    })
  }
  return list
}

@Controller('/mqp')
export class MqpController {
  constructor(private readonly appService: AppService) {}

  //登录
  @Post('/users/login')
  async login(@Body() createCatDto: CreateCatDto): Promise<response<any>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (createCatDto.username === 'admin' && createCatDto.password === 'admin') {
          let data = {
            msg: '登录成功',
            data: {
              token:
                'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJVVUlEIjoiMGE5M2NkOTMtZjkxMC00NmQ4LTg1MTYtMGEwZWJhZjg5ZGRiIiwiSUQiOjE0MCwiVXNlcm5hbWUiOiIiLCJOaWNrTmFtZSI6IuS4gOWQmyIsIlJvbGVDb21wYW55UmVsYXRpb25zaGlwIjpbeyJ1c2VySWQiOjE0MCwiY29tcGFueUlkIjozLCJyb2xlSWQiOjR9XSwiQ29tcGFueUtleSI6ImRlZXBzZW5zaW5nIiwiQnVmZmVyVGltZSI6ODY0MDAsImV4cCI6MTcyNDIyNzU5MiwibmJmIjoxNzIzNjIxNzkyfQ.kJQzW1ouWiV1r9H9iMREbj1LHhYvWIOz_IiulhDApof3JCuwxVEWDyzm3lM7MqZM7k8k1Ov1zgdjd9vTP24HEQPH0-ZLKHF3uclbafVKaVJmf9D2k3f6G6M4SPaPnhCGNpEu5-wvf0xEn2LGXeK-6VpIRmUkhvHvFBWfxvUdfRE4-e6mh0eufF2wAauqWj2QK6nzr2EFepj_G3UZddPoaNrzIF2gShKUIhjjvSrNN5nXYLUNYWiv0fn_ojt4so5eAOWun7_2rEK7CBD6ESItI1-_z9lAQjiouUEQgtWW7vZozrkCztmrJ0D2j6-xAKeFwedUyulUvLwvRy5_bLXhdw',
              user: { user: { username: 'admin', password: 'admin' } },
            },
          }
          resolve(data)
        } else {
          let data = {
            msg: '用户名或密码错误',
            data: {},
          }
          reject(new BadRequestException(data))
        }
      }, 1000)
    })
  }

  @Get()
  getHello(): response<string> {
    return this.appService.getHello()
  }
  @Get('/test1')
  getTest(): string {
    // return this.appService.getTest();
    return '这是测试的回复!'
  }
}
