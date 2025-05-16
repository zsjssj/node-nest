import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateIceApiDto } from './dto/create-ice-api.dto';
import { UpdateIceApiDto } from './dto/update-ice-api.dto';
import * as svgCaptcha from 'svg-captcha';
import * as bcrypt from 'bcrypt';

let userList = [
  {
    id: 'a8c4376671fff6b06c4ed920b7806afb',
    created_at: '2025-05-09T08:53:13.416041Z',
    updated_at: '2025-05-09T08:53:13.416041Z',
    deleted_at: null,
    userName: 'ssje',
    disabled: true,
    updatePassword: '0001-01-01T00:00:00Z',
    email: '',
    nickName: '没了空白',
    phoneNumber: '',
    phoneVerify: false,
    openid: '',
    unionid: '',
    appletOpenid: '',
    authCenterUuid: 'b104e234-8186-42ee-bfb3-f23b7c4a879a',
    headerImg: '',
    companyKeys: [''],
    CompanyRoles: null,
    userCompanyRoles: [
      {
        userId: 'a8c4376671fff6b06c4ed920b7806afb',
        companyId: 'd278b30814cec56f627700c77d6756b5',
        roleId: 'b51f710a2408ea3c1ed3aabf18658b0c',
        User: {
          id: '',
          created_at: '0001-01-01T00:00:00Z',
          updated_at: '0001-01-01T00:00:00Z',
          deleted_at: null,
          userName: '',
          disabled: false,
          updatePassword: '0001-01-01T00:00:00Z',
          email: '',
          nickName: '',
          phoneNumber: '',
          phoneVerify: false,
          openid: '',
          unionid: '',
          appletOpenid: '',
          authCenterUuid: '',
          headerImg: '',
          companyKeys: null,
          CompanyRoles: null,
        },
        Company: { id: 'd278b30814cec56f627700c77d6756b5', created_at: '2025-03-31T10:03:15.653678Z', updated_at: '2025-03-31T10:03:15.653678Z', deleted_at: null, companyName: '默认', companyKey: 'default', description: '', UserRoles: null },
        Role: { id: 'b51f710a2408ea3c1ed3aabf18658b0c', created_at: '2025-03-31T10:10:17.790949Z', updated_at: '2025-03-31T10:10:17.790949Z', deleted_at: null, roleName: '默认角色', roleKey: 'default', defaultRouter: 'dashboard', UserCompanyRoles: null },
      },
    ],
  },
  {
    id: '3e57bcc00c81e7b5113c01302cf8f8aa',
    created_at: '2025-04-07T03:07:43.065741Z',
    updated_at: '2025-04-07T03:07:43.065741Z',
    deleted_at: null,
    userName: 'zdfaswdawad',
    disabled: false,
    updatePassword: '0001-01-01T00:00:00Z',
    email: '',
    nickName: '超级管理员',
    phoneNumber: '',
    phoneVerify: false,
    openid: '',
    unionid: '',
    appletOpenid: '',
    authCenterUuid: 'df53c5a1-abec-496c-9c0f-d1968289ce09',
    headerImg: '',
    companyKeys: [''],
    CompanyRoles: null,
    userCompanyRoles: [
      {
        userId: '3e57bcc00c81e7b5113c01302cf8f8aa',
        companyId: 'd278b30814cec56f627700c77d6756b5',
        roleId: 'b51f710a2408ea3c1ed3aabf18658b0c',
        User: {
          id: '',
          created_at: '0001-01-01T00:00:00Z',
          updated_at: '0001-01-01T00:00:00Z',
          deleted_at: null,
          userName: '',
          disabled: false,
          updatePassword: '0001-01-01T00:00:00Z',
          email: '',
          nickName: '',
          phoneNumber: '',
          phoneVerify: false,
          openid: '',
          unionid: '',
          appletOpenid: '',
          authCenterUuid: '',
          headerImg: '',
          companyKeys: null,
          CompanyRoles: null,
        },
        Company: { id: 'd278b30814cec56f627700c77d6756b5', created_at: '2025-03-31T10:03:15.653678Z', updated_at: '2025-03-31T10:03:15.653678Z', deleted_at: null, companyName: '默认', companyKey: 'default', description: '', UserRoles: null },
        Role: { id: 'b51f710a2408ea3c1ed3aabf18658b0c', created_at: '2025-03-31T10:10:17.790949Z', updated_at: '2025-03-31T10:10:17.790949Z', deleted_at: null, roleName: '默认角色', roleKey: 'default', defaultRouter: 'dashboard', UserCompanyRoles: null },
      },
    ],
  },
  {
    id: 'aeef5767f4b90fa591f2ced79fb71327',
    created_at: '2025-03-31T10:58:28.683117Z',
    updated_at: '2025-04-01T02:24:14.177531Z',
    deleted_at: null,
    userName: 'ssrasfwad',
    disabled: false,
    updatePassword: '0001-01-01T00:00:00Z',
    email: '',
    nickName: '一君',
    phoneNumber: '',
    phoneVerify: false,
    openid: '',
    unionid: '',
    appletOpenid: '',
    authCenterUuid: '0a93cd93-f910-46d8-8516-0a0ebaf89ddb',
    headerImg: '',
    companyKeys: ['default'],
    CompanyRoles: null,
    userCompanyRoles: [
      {
        userId: 'aeef5767f4b90fa591f2ced79fb71327',
        companyId: 'd278b30814cec56f627700c77d6756b5',
        roleId: 'b51f710a2408ea3c1ed3aabf18658b0c',
        User: {
          id: '',
          created_at: '0001-01-01T00:00:00Z',
          updated_at: '0001-01-01T00:00:00Z',
          deleted_at: null,
          userName: '',
          disabled: false,
          updatePassword: '0001-01-01T00:00:00Z',
          email: '',
          nickName: '',
          phoneNumber: '',
          phoneVerify: false,
          openid: '',
          unionid: '',
          appletOpenid: '',
          authCenterUuid: '',
          headerImg: '',
          companyKeys: null,
          CompanyRoles: null,
        },
        Company: { id: 'd278b30814cec56f627700c77d6756b5', created_at: '2025-03-31T10:03:15.653678Z', updated_at: '2025-03-31T10:03:15.653678Z', deleted_at: null, companyName: '默认', companyKey: 'default', description: '', UserRoles: null },
        Role: { id: 'b51f710a2408ea3c1ed3aabf18658b0c', created_at: '2025-03-31T10:10:17.790949Z', updated_at: '2025-03-31T10:10:17.790949Z', deleted_at: null, roleName: '默认角色', roleKey: 'default', defaultRouter: 'dashboard', UserCompanyRoles: null },
      },
    ],
  },
];
let roleList = [
  { id: 'b51f710a2408ea3c1ed3aabf18658b0c', created_at: '2025-03-31T10:10:17.790949Z', updated_at: '2025-03-31T10:10:17.790949Z', deleted_at: null, roleName: '默认角色', roleKey: 'default', defaultRouter: 'dashboard', UserCompanyRoles: null },
  { id: '1c513277d53004db04999d4a82c11ba6', created_at: '2025-04-01T02:06:03.598845Z', updated_at: '2025-04-01T02:06:03.598845Z', deleted_at: null, roleName: '超级管理员', roleKey: 'admin', defaultRouter: 'dashboard', UserCompanyRoles: null },
];

let administrations = [
  {
    objectId: '4e9ea90739da6dbd5e4818fb4df02c0f',
    createdAt: '2023-11-08T16:24:15.221225Z',
    Node: { Id: 1290, ElementId: '1290', Labels: ['Administration'], Props: { companyKey: 'deepsensing', createdAt: {}, name: '总区', objectId: '4e9ea90739da6dbd5e4818fb4df02c0f' } },
    name: '总区',
    labels: ['Administration'],
    fullPath: '',
    masterLabel: 'Administration',
    children: [
      {
        objectId: '8e52ba674c87f6ef81b919d39d725ed3',
        createdAt: '2023-11-08T16:29:54.416221Z',
        Node: { Id: 1294, ElementId: '1294', Labels: ['Administration'], Props: { companyKey: 'nott', createdAt: {}, name: '诺特', objectId: '8e52ba674c87f6ef81b919d39d725ed3' } },
        name: '诺特',
        labels: ['Administration'],
        fullPath: '',
        masterLabel: 'Administration',
        children: null,
        region: { name: '', objectId: '', adcode: 0, regionLevel: '', children: null, substation: null },
        ratedCurrent: 0,
        ratedPower: 0,
        fieldMap: { companyKey: 'nott', createdAt: {}, name: '诺特', objectId: '8e52ba674c87f6ef81b919d39d725ed3' },
      },
      {
        objectId: '5cfb209e844637d4d6efb189fca79083',
        createdAt: '2023-11-17T16:28:22.087683Z',
        Node: { Id: 1386, ElementId: '1386', Labels: ['Administration'], Props: { companyKey: 'test_wrl', createdAt: {}, name: 'w我的测试', objectId: '5cfb209e844637d4d6efb189fca79083' } },
        name: 'w我的测试',
        labels: ['Administration'],
        fullPath: '',
        masterLabel: 'Administration',
        children: null,
        region: { name: '', objectId: '', adcode: 0, regionLevel: '', children: null, substation: null },
        ratedCurrent: 0,
        ratedPower: 0,
        fieldMap: { companyKey: 'test_wrl', createdAt: {}, name: 'w我的测试', objectId: '5cfb209e844637d4d6efb189fca79083' },
      },
      {
        objectId: '39b5d0ef15580d502211e1fd24caa0b8',
        createdAt: '2023-11-29T16:59:40.458727Z',
        Node: { Id: 2166, ElementId: '2166', Labels: ['Administration'], Props: { companyKey: 'std', createdAt: {}, name: '数本科技', objectId: '39b5d0ef15580d502211e1fd24caa0b8' } },
        name: '数本科技',
        labels: ['Administration'],
        fullPath: '',
        masterLabel: 'Administration',
        children: null,
        region: { name: '', objectId: '', adcode: 0, regionLevel: '', children: null, substation: null },
        ratedCurrent: 0,
        ratedPower: 0,
        fieldMap: { companyKey: 'std', createdAt: {}, name: '数本科技', objectId: '39b5d0ef15580d502211e1fd24caa0b8' },
      },
      {
        objectId: '97e72f28a31bfdc7babe9a41962a86b2',
        createdAt: '2024-12-09T09:54:38.721375Z',
        Node: { Id: 11181, ElementId: '11181', Labels: ['Administration'], Props: { companyKey: 'dbxqgdj-91510185906856235J', createdAt: {}, name: '东部新区供电局', objectId: '97e72f28a31bfdc7babe9a41962a86b2' } },
        name: '东部新区供电局',
        labels: ['Administration'],
        fullPath: '',
        masterLabel: 'Administration',
        children: null,
        region: { name: '', objectId: '', adcode: 0, regionLevel: '', children: null, substation: null },
        ratedCurrent: 0,
        ratedPower: 0,
        fieldMap: { companyKey: 'dbxqgdj-91510185906856235J', createdAt: {}, name: '东部新区供电局', objectId: '97e72f28a31bfdc7babe9a41962a86b2' },
      },
      {
        objectId: '1b51910b68f52e610e294328d7fe4dbd',
        createdAt: '2023-11-08T16:28:19.68846Z',
        Node: { Id: 1291, ElementId: '1291', Labels: ['Administration'], Props: { companyKey: 'dujiangyan_powerSupplyBureau', createdAt: {}, name: '都江堰物业', objectId: '1b51910b68f52e610e294328d7fe4dbd' } },
        name: '都江堰物业',
        labels: ['Administration'],
        fullPath: '',
        masterLabel: 'Administration',
        children: null,
        region: { name: '', objectId: '', adcode: 0, regionLevel: '', children: null, substation: null },
        ratedCurrent: 0,
        ratedPower: 0,
        fieldMap: { companyKey: 'dujiangyan_powerSupplyBureau', createdAt: {}, name: '都江堰物业', objectId: '1b51910b68f52e610e294328d7fe4dbd' },
      },
      {
        objectId: 'ff7be4e413f9f2e7ba5528e5f3200c30',
        createdAt: '2023-11-08T16:29:02.710777Z',
        Node: { Id: 1292, ElementId: '1292', Labels: ['Administration'], Props: { companyKey: 'nanjing_electric_power_automation_cy', createdAt: {}, name: '南京电研电力自动化股份有限公司', objectId: 'ff7be4e413f9f2e7ba5528e5f3200c30' } },
        name: '南京电研电力自动化股份有限公司',
        labels: ['Administration'],
        fullPath: '',
        masterLabel: 'Administration',
        children: null,
        region: { name: '', objectId: '', adcode: 0, regionLevel: '', children: null, substation: null },
        ratedCurrent: 0,
        ratedPower: 0,
        fieldMap: { companyKey: 'nanjing_electric_power_automation_cy', createdAt: {}, name: '南京电研电力自动化股份有限公司', objectId: 'ff7be4e413f9f2e7ba5528e5f3200c30' },
      },
      {
        objectId: '2ab580cb97bf8fa788c7aac1c223c648',
        createdAt: '2023-11-08T16:29:31.089092Z',
        Node: { Id: 1293, ElementId: '1293', Labels: ['Administration'], Props: { companyKey: 'deepsensing_lab', createdAt: {}, name: '生产测试实验室', objectId: '2ab580cb97bf8fa788c7aac1c223c648' } },
        name: '生产测试实验室',
        labels: ['Administration'],
        fullPath: '',
        masterLabel: 'Administration',
        children: [
          {
            objectId: '00e877e001a61c988e3818a9a5e0aaa2',
            createdAt: '2024-10-27T16:08:44.665213Z',
            Node: { Id: 11155, ElementId: '11155', Labels: ['Administration'], Props: { companyKey: 'da_li', createdAt: {}, name: '111', objectId: '00e877e001a61c988e3818a9a5e0aaa2' } },
            name: '111',
            labels: ['Administration'],
            fullPath: '',
            masterLabel: 'Administration',
            children: null,
            region: { name: '', objectId: '', adcode: 0, regionLevel: '', children: null, substation: null },
            ratedCurrent: 0,
            ratedPower: 0,
            fieldMap: { companyKey: 'da_li', createdAt: {}, name: '111', objectId: '00e877e001a61c988e3818a9a5e0aaa2' },
          },
        ],
        region: { name: '', objectId: '', adcode: 0, regionLevel: '', children: null, substation: null },
        ratedCurrent: 0,
        ratedPower: 0,
        fieldMap: { companyKey: 'deepsensing_lab', createdAt: {}, name: '生产测试实验室', objectId: '2ab580cb97bf8fa788c7aac1c223c648' },
      },
    ],
    region: { name: '', objectId: '', adcode: 0, regionLevel: '', children: null, substation: null },
    ratedCurrent: 0,
    ratedPower: 0,
    fieldMap: { companyKey: 'deepsensing', createdAt: {}, name: '总区', objectId: '4e9ea90739da6dbd5e4818fb4df02c0f' },
  },
];

let lines = [
  {
    id: 'a037aa00905e61f4765d164311579d41',
    created_at: '2024-01-16T01:48:39.571239Z',
    updated_at: '2024-01-16T01:48:39.571239Z',
    deleted_at: null,
    companyKeys: ['deepsensing', 'esr', 'su_dao', 'huidong-sudao'],
    name: '光伏（hd）',
    terrainPath: '/path/to/terrain_2',
    splitWiresCnt: 0,
    voltageLevel: '10000',
    coordinates: { x: 123.6789, y: 45.5678 },
    loopCnt: 3,
  },
  {
    id: 'e642c1ca31e9bbf1b8db43aba7a79b58',
    created_at: '2024-01-10T07:47:34.277912Z',
    updated_at: '2024-01-10T07:47:34.277912Z',
    deleted_at: null,
    companyKeys: ['deepsensing'],
    name: '测试1',
    terrainPath: '/path/to/terrain_2',
    splitWiresCnt: 0,
    voltageLevel: '10000',
    coordinates: { x: 123.6789, y: 45.5678 },
    loopCnt: 3,
  },
  {
    id: '91987ce27ce1c8e16ff4efac8ca60a13',
    created_at: '2024-04-30T08:21:58.014925Z',
    updated_at: '2024-04-30T08:21:58.014925Z',
    deleted_at: null,
    companyKeys: ['esr', 'deepsensing'],
    name: 'abb测试',
    terrainPath: '',
    splitWiresCnt: 0,
    voltageLevel: '10000',
    coordinates: { x: 13.6789, y: 45.5678 },
    loopCnt: 3,
  },
  {
    id: 'f0f29042de3d21f51619afbae1866dec',
    created_at: '2024-11-18T08:53:27.134226Z',
    updated_at: '2024-11-18T08:53:27.134226Z',
    deleted_at: null,
    companyKeys: ['esr', 'deepsensing', 'atm_91430102MA4TBKNYX0'],
    name: '除冰 ',
    terrainPath: '',
    splitWiresCnt: 0,
    voltageLevel: '10000',
    coordinates: { x: 13.6789, y: 45.5678 },
    loopCnt: 3,
  },
  {
    id: '799b3f4917c60940e9551dbe966b17b4',
    created_at: '2025-02-14T07:10:14.170275Z',
    updated_at: '2025-02-14T07:10:14.170275Z',
    deleted_at: null,
    companyKeys: ['deepsensing', 'cd_powerSupplyBureau'],
    name: '北斗RTK弧垂\u0026线夹测温监测(cd)',
    terrainPath: '',
    splitWiresCnt: 0,
    voltageLevel: '10000',
    coordinates: { x: 13.6789, y: 45.5678 },
    loopCnt: 3,
  },
  {
    id: '84b9feed484230d0931788f9510b505c',
    created_at: '2024-06-26T07:27:38.469696Z',
    updated_at: '2024-06-26T07:27:38.469696Z',
    deleted_at: null,
    companyKeys: ['esr', 'deepsensing', 'wulongElectricPowerCompany', 'cq_power_transmission_transformation'],
    name: '北斗RTK弧垂\u0026线夹测温监测 ',
    terrainPath: '',
    splitWiresCnt: 0,
    voltageLevel: '10000',
    coordinates: { x: 13.6789, y: 45.5678 },
    loopCnt: 3,
  },
  {
    id: '4398d1cb883537efc9d623d257db3b58',
    created_at: '2024-10-25T06:58:29.447528Z',
    updated_at: '2024-10-25T06:58:29.447528Z',
    deleted_at: null,
    companyKeys: ['esr', 'deepsensing', 'qinghua', 'hunan91430400MA4PC7W80D'],
    name: '地线监测(hn)',
    terrainPath: '',
    splitWiresCnt: 0,
    voltageLevel: '10000',
    coordinates: { x: 13.6789, y: 45.5678 },
    loopCnt: 3,
  },
  {
    id: '6c7d298c691d564e39ba3b6e6cb21bdf',
    created_at: '2024-12-24T06:32:59.957166Z',
    updated_at: '2024-12-24T06:32:59.957166Z',
    deleted_at: null,
    companyKeys: ['deepsensing', 'atm_91430102MA4TBKNYX0'],
    name: 'hn-cs',
    terrainPath: '',
    splitWiresCnt: 0,
    voltageLevel: '10000',
    coordinates: { x: 13.6789, y: 45.5678 },
    loopCnt: 3,
  },
];

function generateRandomString(length: number): string {
  let result: string = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < Number(length); i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

@Injectable()
export class IceApiService {
  create(createIceApiDto: CreateIceApiDto) {
    return 'This action adds a new iceApi';
  }

  findAll() {
    return `This action returns all iceApi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} iceApi`;
  }

  update(id: number, updateIceApiDto: UpdateIceApiDto) {
    return `This action updates a #${id} iceApi`;
  }

  remove(id: number) {
    return `This action removes a #${id} iceApi`;
  }
  getAramType() {
    const aramType = {
      1: { name: '覆冰', desc: '' },
      2: { name: '大风', desc: '' },
      3: { name: '暴雨', desc: '' },
    };
    return { data: aramType, msg: 'ok' };
  }
  getDeviceType() {
    const deviceType = {
      data: [
        { sensorTypeName: '微气象监测', sensorType: 1, protocolType: 1, dataTypeMap: { '0': [1] }, alarmTypes: [12, 7, 6] },
        { sensorTypeName: '杆塔倾斜监测', sensorType: 2, protocolType: 1, dataTypeMap: { '0': [2] }, alarmTypes: [8] },
        { sensorTypeName: '微风振动', sensorType: 3, protocolType: 1, dataTypeMap: { '0': [3, 4, 217] }, alarmTypes: [14] },
        { sensorTypeName: '导线舞动监测', sensorType: 5, protocolType: 1, dataTypeMap: { '0': [9] }, alarmTypes: [9] },
      ],
    };
    return { data: deviceType, msg: 'ok' };
  }
  getAramRealTimeData(id: string) {
    const tableData_default = [
      { index: 1, date: 'xxx机构', name: '线路一', towerName: '杆塔号一', phase: '2023-10-01 12:00:00', type: '2023-10-01 12:00:00', info: '处理操作' },
      { index: 2, date: 'xxx机构', name: '线路二', towerName: '杆塔号二', phase: '2023-10-02 12:00:00', type: '2023-10-02 12:00:00', info: '处理操作' },
      { index: 3, date: 'xxx机构', name: '线路三', towerName: '杆塔号三', phase: '2023-10-03 12:00:00', type: '2023-10-03 12:00:00', info: '处理操作' },
      { index: 4, date: 'xxx机构', name: '线路四', towerName: '杆塔号四', phase: '2023-10-04 12:00:00', type: '2023-10-04 12:00:00', info: '处理操作' },
      { index: 5, date: 'xxx机构', name: '线路五', towerName: '杆塔号五', phase: '2023-10-05 12:00:00', type: '2023-10-05 12:00:00', info: '处理操作' },
      { index: 6, date: 'xxx机构', name: '线路六', towerName: '杆塔号六', phase: '2023-10-06 12:00:00', type: '2023-10-06 12:00:00', info: '处理操作' },
      { index: 7, date: 'xxx机构', name: '线路七', towerName: '杆塔号七', phase: '2023-10-07 12:00:00', type: '2023-10-07 12:00:00', info: '处理操作' },
      { index: 8, date: 'xxx机构', name: '线路八', towerName: '杆塔号八', phase: '2023-10-08 12:00:00', type: '2023-10-08 12:00:00', info: '处理操作' },
    ];
  }
  createCode() {
    try {
      const captcha = svgCaptcha.create({
        size: 4,
        ignoreChars: '0o1i',
        noise: 2,
        color: true,
        fontSize: 50,
        width: 100,
        height: 40,
        background: '#cc9966',
      });
      return captcha;
    } catch (error) {
      throw new BadRequestException('生成验证码失败');
    }
  }
  getAdministrations() {
    const res = {
      data: administrations,
      msg: '操作成功',
    };
    return res;
  }
  getUserList({ page, pageSize }) {
    const res = {
      data: {
        list: userList,
        total: 3,
        page: 1,
        pageSize: 10,
      },
      msg: '操作成功',
    };
    return res;
  }
  getRoleList() {
    return { data: roleList, msg: '获取成功' };
  }
  addUser(data: { CompanyInfo: { companyId: string; companyKey: string }; email: string; nickName: string; password: string; phone: string; userName: string; roleList: string[] }) {
    const { CompanyInfo, nickName, email, phone, userName } = data;
    const created_at = new Date().toISOString();
    const id = generateRandomString(32);
    const obj = {
      id,
      created_at,
      updated_at: '0001-01-01T00:00:00Z',
      deleted_at: null,
      userName,
      disabled: false,
      updatePassword: '0001-01-01T00:00:00Z',
      email: '',
      nickName,
      phoneNumber: phone,
      phoneVerify: false,
      openid: '',
      unionid: '',
      appletOpenid: '',
      authCenterUuid: 'b104e234-8186-42ee-bfb3-f23b7c4a879a',
      headerImg: '',
      companyKeys: [''],
      CompanyRoles: null,
      userCompanyRoles: [
        {
          userId: 'a8c4376671fff6b06c4ed920b7806afb',
          companyId: CompanyInfo.companyId,
          roleId: 'b51f710a2408ea3c1ed3aabf18658b0c',
          User: {
            id,
            created_at: '0001-01-01T00:00:00Z',
            updated_at: '0001-01-01T00:00:00Z',
            deleted_at: null,
            userName,
            disabled: false,
            updatePassword: '0001-01-01T00:00:00Z',
            email,
            nickName,
            phoneNumber: phone,
            phoneVerify: false,
            openid: '',
            unionid: '',
            appletOpenid: '',
            authCenterUuid: '',
            headerImg: '',
            companyKeys: null,
            CompanyRoles: null,
          },
          Company: { id: CompanyInfo.companyId, created_at: '2025-03-31T10:03:15.653678Z', updated_at: '2025-03-31T10:03:15.653678Z', deleted_at: null, companyName: '默认', companyKey: 'default', description: '', UserRoles: null },
          Role: { id: 'b51f710a2408ea3c1ed3aabf18658b0c', created_at: '2025-03-31T10:10:17.790949Z', updated_at: '2025-03-31T10:10:17.790949Z', deleted_at: null, roleName: '默认角色', roleKey: 'default', defaultRouter: 'dashboard', UserCompanyRoles: null },
        },
      ],
    };
    userList.push(obj);
    return { data: null, msg: '操作成功' };
  }
  updateUser(body: any[]) {
    console.log('body', body);
    const res = {
      data: null,
      msg: '操作成功',
    };
    return res;
  }
  deleteUserFover(userIds: string) {
    userList = userList.filter((item) => item.id !== userIds);
    return { data: userIds, msg: '操作成功' };
  }
  deleteUser(userIds: string) {
    const res = userList.find((item) => item.id === userIds);
    if (!res) return { msg: '用户不存在', data: null };
    res.disabled = true;
    return { data: userIds, msg: '操作成功' };
  }
  putRecover(userIds: string) {
    const res = userList.find((item) => item.id === userIds);
    if (!res) return { msg: '用户不存在', data: null };
    res.disabled = false;
    return { data: userIds, msg: '操作成功' };
  }
  getLineList() {
    return { data: lines, msg: '操作成功' };
  }
}
