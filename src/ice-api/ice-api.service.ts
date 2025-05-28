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
const deviceType = [
  { sensorTypeName: '微气象监测', sensorType: 1, protocolType: 1, dataTypeMap: { '0': [1] }, alarmTypes: [12, 7, 6] },
  { sensorTypeName: '杆塔倾斜监测', sensorType: 2, protocolType: 1, dataTypeMap: { '0': [2] }, alarmTypes: [8] },
  { sensorTypeName: '微风振动', sensorType: 3, protocolType: 1, dataTypeMap: { '0': [3, 4, 217] }, alarmTypes: [14] },
  { sensorTypeName: '导线舞动监测', sensorType: 5, protocolType: 1, dataTypeMap: { '0': [9] }, alarmTypes: [9] },
  { sensorTypeName: '故障信息', sensorType: 6, protocolType: 1, dataTypeMap: { '0': [194] }, alarmTypes: null },
  { sensorTypeName: '耐张线夹温度监测', sensorType: 7, protocolType: 1, dataTypeMap: { '0': [216] }, alarmTypes: [11] },
  { sensorTypeName: '电缆负荷监测', sensorType: 8, protocolType: 1, dataTypeMap: { '0': [215] }, alarmTypes: [10] },
  { sensorTypeName: '通道可视化', sensorType: 9, protocolType: 1, dataTypeMap: { '0': [225] }, alarmTypes: null },
  { sensorTypeName: '设备状态', sensorType: 10, protocolType: 1, dataTypeMap: { '0': [213] }, alarmTypes: [3] },
  { sensorTypeName: '导线全景监测', sensorType: 11, protocolType: 1, dataTypeMap: { '0': [226] }, alarmTypes: [5, 13, 10] },
  { sensorTypeName: '覆冰监测', sensorType: 4, protocolType: 1, dataTypeMap: { '0': [7] }, alarmTypes: [2] },
  { sensorTypeName: '泄露电流', sensorType: 12, protocolType: 1, dataTypeMap: { '0': [218, 219] }, alarmTypes: null },
  { sensorTypeName: 'PSU12', sensorType: 13, protocolType: 1, dataTypeMap: { '0': [220, 168] }, alarmTypes: null },
  { sensorTypeName: 'RTK', sensorType: 14, protocolType: 1, dataTypeMap: { '0': [12] }, alarmTypes: null },
  { sensorTypeName: 'RTK图像', sensorType: 20, protocolType: 1, dataTypeMap: { '0': [177, 179, 180, 181, 182, 185] }, alarmTypes: null },
  { sensorTypeName: '金具状态', sensorType: 15, protocolType: 1, dataTypeMap: { '0': [221] }, alarmTypes: null },
  { sensorTypeName: '故障电流', sensorType: 16, protocolType: 1, dataTypeMap: { '0': [234, 235] }, alarmTypes: null },
  { sensorTypeName: '地线监测', sensorType: 17, protocolType: 1, dataTypeMap: { '0': [241, 243, 242] }, alarmTypes: null },
  { sensorTypeName: '导线状态检测', sensorType: 18, protocolType: 1, dataTypeMap: { '0': [222] }, alarmTypes: null },
  { sensorTypeName: '电机', sensorType: 19, protocolType: 1, dataTypeMap: { '0': [236, 223] }, alarmTypes: null },
  { sensorTypeName: '海康摄像头', sensorType: 21, protocolType: 1, dataTypeMap: { '0': [244] }, alarmTypes: null },
  { sensorTypeName: '断路器', sensorType: 22, protocolType: 1, dataTypeMap: { '0': [237, 169] }, alarmTypes: null },
  { sensorTypeName: '弧垂', sensorType: 23, protocolType: 1, dataTypeMap: { '0': [5] }, alarmTypes: null },
  { sensorTypeName: '风偏', sensorType: 24, protocolType: 1, dataTypeMap: { '0': [8] }, alarmTypes: null },
  { sensorTypeName: '导线舞动轨迹', sensorType: 25, protocolType: 1, dataTypeMap: { '0': [10] }, alarmTypes: null },
  { sensorTypeName: '导线覆冰厚度', sensorType: 26, protocolType: 1, dataTypeMap: { '0': [13] }, alarmTypes: null },
  { sensorTypeName: '环境温湿度', sensorType: 27, protocolType: 1, dataTypeMap: { '0': [14] }, alarmTypes: null },
  { sensorTypeName: '心跳', sensorType: 28, protocolType: 1, dataTypeMap: { '0': [193] }, alarmTypes: null },
  { sensorTypeName: '故障定位', sensorType: 29, protocolType: 2, dataTypeMap: { '1': [1, 4, 3, 5, 9], '5': [1, 5, 2, 7] }, alarmTypes: null },
  { sensorTypeName: '电机2.0', sensorType: 30, protocolType: 1, dataTypeMap: { '0': [19] }, alarmTypes: null },
];
let administrations = {
  id: '1111111',
  created_at: '0001-01-01T00:00:00Z',
  updated_at: '0001-01-01T00:00:00Z',
  deleted_at: null,
  companyKey: 'deepsensing',
  name: '清蓉深瞳',
  description: '',
  regionId: 0,
  parentCompanys: null,
  UserRoles: null,
  Region: {
    ID: 0,
    CreatedAt: '0001-01-01T00:00:00Z',
    UpdatedAt: '0001-01-01T00:00:00Z',
    DeletedAt: null,
    name: '',
    adcode: 0,
    regionLevel: '',
  },
  Children: null,
};

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

let towerTypeInfo = [
  {
    id: '5a87799bc4246dffe80591b091d7c9b6',
    created_at: '2023-12-29T09:32:36.316576Z',
    updated_at: '2023-12-29T09:32:36.316576Z',
    deleted_at: null,
    name: 'tower1',
    filePath: 'deepgrid/towerType/tower1.glb',
    terminalPoints: '{"1": {"x": 0, "y": -27, "z": 52}, "2": {"x": 0, "y": 0, "z": 52}, "3": {"x": 0, "y": 27, "z": 52}}',
  },
  {
    id: '4a7538ca3b3aa2a872d4bc70b96301d4',
    created_at: '2024-04-07T08:13:33.563264Z',
    updated_at: '2024-04-07T08:13:33.563264Z',
    deleted_at: null,
    name: 'ZG2',
    filePath: 'deepgrid/towerType/ZG2.glb',
    terminalPoints: '{"1": {"x": 0, "y": -1.57348, "z": 9.77835}, "2": {"x": 0, "y": -1.55909, "z": 6.06274}, "3": {"x": 0, "y": 1.55909, "z": 6.06274}}',
  },
  {
    id: '18057ce68ef06a87ab7d94b11f5882fd',
    created_at: '2024-03-13T08:18:22.557527Z',
    updated_at: '2024-03-13T08:18:22.557527Z',
    deleted_at: null,
    name: 'ZS2',
    filePath: 'deepgrid/towerType/zs3.glb',
    terminalPoints: '{"1": {"x": -0.012982, "y": 0.92151, "z": 8.61806}, "2": {"x": -0.012982, "y": -0.921504, "z": 7.48247}, "3": {"x": -0.012982, "y": 0.903358, "z": 7.48247}}',
  },
  {
    id: 'e6e3e13c32bf3b48e867044285dd2eeb',
    created_at: '2024-10-22T01:52:41.348994Z',
    updated_at: '2024-10-22T01:52:41.348994Z',
    deleted_at: null,
    name: 'ZG3',
    filePath: 'deepgrid/towerType/ZG3.glb',
    terminalPoints:
      '{"1": {"x": -0.002654, "y": -1.79015, "z": 8.62038}, "2": {"x": -0.002654, "y": 1.79015, "z": 8.62038}, "3": {"x": -0.002654, "y": -1.79015, "z": 6.60044}, "4": {"x": -0.002654, "y": 1.79015, "z": 6.60044}, "5": {"x": -0.002654, "y": -1.79015, "z": 4.5799}, "6": {"x": -0.002654, "y": 1.79015, "z": 4.5799}}',
  },
  {
    id: '4e82016c8d3f7890f6f78ad82e6f2fd9',
    created_at: '2024-12-05T02:17:25.880037Z',
    updated_at: '2024-12-05T02:17:25.880037Z',
    deleted_at: null,
    name: 'DXG01',
    filePath: 'deepgrid/towerType/DXG.glb',
    terminalPoints: '{"1": {"x": 0, "y": -27, "z": 52}, "2": {"x": 0, "y": 0, "z": 52}, "3": {"x": 0, "y": 27, "z": 52}}',
  },
  {
    id: 'd8b4a1f423a0e5041baeb2ae4a49f07b',
    created_at: '2024-03-13T08:15:47.132399Z',
    updated_at: '2024-03-13T08:15:47.132399Z',
    deleted_at: null,
    name: 'ZB1',
    filePath: 'deepgrid/towerType/B1.glb',
    terminalPoints: '{"1": {"x": 0, "y": -2.05645, "z": 8.57217}, "2": {"x": 0, "y": 0, "z": 8.57217}, "3": {"x": 0, "y": 2.03055, "z": 8.57217}}',
  },
  {
    id: 'f9802d638d152d19c3a5b53b7c2da6eb',
    created_at: '2024-03-13T08:18:44.104774Z',
    updated_at: '2024-03-13T08:18:44.104774Z',
    deleted_at: null,
    name: 'ZS1',
    filePath: 'deepgrid/towerType/zs1.glb',
    terminalPoints: '{"1": {"x": -0.012982, "y": -0.92151, "z": 8.61806}, "2": {"x": -0.012982, "y": -0.921504, "z": 7.48247}, "3": {"x": -0.012982, "y": 0.903358, "z": 7.48247}}',
  },
  {
    id: '3e94caf4dcad1aeaeb4f90054dd30756',
    created_at: '2024-03-13T08:36:59.528286Z',
    updated_at: '2024-03-13T08:36:59.528286Z',
    deleted_at: null,
    name: 'ZG1',
    filePath: 'deepgrid/towerType/ZG1.glb',
    terminalPoints: '{"1": {"x": -0.012982, "y": -0.92151, "z": 8.61806}, "2": {"x": -0.012982, "y": -0.921504, "z": 7.48247}, "3": {"x": -0.012982, "y": 0.903358, "z": 7.48247}}',
  },
];

let towerList = [
  {
    id: '49023d27f9588207f52cd8eff8f24e24',
    created_at: '2024-01-16T03:34:33.070244Z',
    updated_at: '2024-01-16T03:34:33.070244Z',
    deleted_at: null,
    name: 'ND6',
    towerComponentId: '',
    towerTypeId: 'f9802d638d152d19c3a5b53b7c2da6eb',
    coordinates: { x: 102.669642, y: 26.611026 },
    towerType: { id: '', created_at: '0001-01-01T00:00:00Z', updated_at: '0001-01-01T00:00:00Z', deleted_at: null, name: '', filePath: '', terminalPoints: null },
    height: 16,
    orientation: 10,
    index: 7,
  },
  {
    id: 'f73850b66aac43370196679b20d961ea',
    created_at: '2024-01-16T03:34:33.070244Z',
    updated_at: '2024-01-16T03:34:33.070244Z',
    deleted_at: null,
    name: 'ND2',
    towerComponentId: '',
    towerTypeId: 'f9802d638d152d19c3a5b53b7c2da6eb',
    coordinates: { x: 102.67225, y: 26.60466 },
    towerType: { id: '', created_at: '0001-01-01T00:00:00Z', updated_at: '0001-01-01T00:00:00Z', deleted_at: null, name: '', filePath: '', terminalPoints: null },
    height: 37,
    orientation: -45,
    index: 2,
  },
  {
    id: 'dcd3a434b61d5b338eb5d8cf8c59cc15',
    created_at: '2024-01-16T03:34:33.070244Z',
    updated_at: '2024-01-16T03:34:33.070244Z',
    deleted_at: null,
    name: 'ND16',
    towerComponentId: '',
    towerTypeId: '3e94caf4dcad1aeaeb4f90054dd30756',
    coordinates: { x: 102.68041, y: 26.625175 },
    towerType: { id: '', created_at: '0001-01-01T00:00:00Z', updated_at: '0001-01-01T00:00:00Z', deleted_at: null, name: '', filePath: '', terminalPoints: null },
    height: 23,
    orientation: 100,
    index: 17,
  },
  {
    id: 'fec261314205baeeadab04cb4f61bb5d',
    created_at: '2024-01-16T03:34:33.070244Z',
    updated_at: '2024-01-16T03:34:33.070244Z',
    deleted_at: null,
    name: 'ND14',
    towerComponentId: '',
    towerTypeId: '3e94caf4dcad1aeaeb4f90054dd30756',
    coordinates: { x: 102.676239, y: 26.623127 },
    towerType: { id: '', created_at: '0001-01-01T00:00:00Z', updated_at: '0001-01-01T00:00:00Z', deleted_at: null, name: '', filePath: '', terminalPoints: null },
    height: 25,
    orientation: 45,
    index: 15,
  },
  {
    id: 'd9edc70c2202fd401cd714ad05e961ee',
    created_at: '2024-01-16T03:34:33.070244Z',
    updated_at: '2024-01-16T03:34:33.070244Z',
    deleted_at: null,
    name: 'ND1',
    towerComponentId: '',
    towerTypeId: 'f9802d638d152d19c3a5b53b7c2da6eb',
    coordinates: { x: 102.673899, y: 26.602959 },
    towerType: { id: '', created_at: '0001-01-01T00:00:00Z', updated_at: '0001-01-01T00:00:00Z', deleted_at: null, name: '', filePath: '', terminalPoints: null },
    height: 24,
    orientation: -45,
    index: 1,
  },
  {
    id: '9c1dc8a9eb282c8e5bb55681e2cabb3b',
    created_at: '2024-01-16T03:34:33.070244Z',
    updated_at: '2024-01-16T03:34:33.070244Z',
    deleted_at: null,
    name: 'ND18',
    towerComponentId: '',
    towerTypeId: '3e94caf4dcad1aeaeb4f90054dd30756',
    coordinates: { x: 102.683508, y: 26.624777 },
    towerType: { id: '', created_at: '0001-01-01T00:00:00Z', updated_at: '0001-01-01T00:00:00Z', deleted_at: null, name: '', filePath: '', terminalPoints: null },
    height: 15,
    orientation: 100,
    index: 19,
  },
  {
    id: '34caed902ec33727ef971d6388e6edec',
    created_at: '2024-01-16T03:34:33.070244Z',
    updated_at: '2024-01-16T03:34:33.070244Z',
    deleted_at: null,
    name: 'ND3',
    towerComponentId: '',
    towerTypeId: 'f9802d638d152d19c3a5b53b7c2da6eb',
    coordinates: { x: 102.670913, y: 26.606042 },
    towerType: { id: '', created_at: '0001-01-01T00:00:00Z', updated_at: '0001-01-01T00:00:00Z', deleted_at: null, name: '', filePath: '', terminalPoints: null },
    height: 25,
    orientation: -30,
    index: 4,
  },
  {
    id: 'fc2ad615dad1de61880c71c669c82f27',
    created_at: '2024-01-16T03:34:33.070244Z',
    updated_at: '2024-01-16T03:34:33.070244Z',
    deleted_at: null,
    name: 'ND10',
    towerComponentId: '',
    towerTypeId: '3e94caf4dcad1aeaeb4f90054dd30756',
    coordinates: { x: 102.67053, y: 26.620325 },
    towerType: { id: '', created_at: '0001-01-01T00:00:00Z', updated_at: '0001-01-01T00:00:00Z', deleted_at: null, name: '', filePath: '', terminalPoints: null },
    height: 24,
    orientation: 45,
    index: 11,
  },
  {
    id: '841029d1b02261fe19d54b47d9d1b3dc',
    created_at: '2024-01-16T03:34:33.070244Z',
    updated_at: '2024-01-16T03:34:33.070244Z',
    deleted_at: null,
    name: 'ND12',
    towerComponentId: '',
    towerTypeId: 'd8b4a1f423a0e5041baeb2ae4a49f07b',
    coordinates: { x: 102.674559, y: 26.622302 },
    towerType: { id: '', created_at: '0001-01-01T00:00:00Z', updated_at: '0001-01-01T00:00:00Z', deleted_at: null, name: '', filePath: '', terminalPoints: null },
    height: 25,
    orientation: 45,
    index: 13,
  },
  {
    id: 'c71d919a8df8e195ecb36bbbc4ea8830',
    created_at: '2024-01-16T03:34:33.070244Z',
    updated_at: '2024-01-16T03:34:33.070244Z',
    deleted_at: null,
    name: 'ND8',
    towerComponentId: '',
    towerTypeId: 'f9802d638d152d19c3a5b53b7c2da6eb',
    coordinates: { x: 102.670096, y: 26.615773 },
    towerType: { id: '', created_at: '0001-01-01T00:00:00Z', updated_at: '0001-01-01T00:00:00Z', deleted_at: null, name: '', filePath: '', terminalPoints: null },
    height: 31,
    orientation: 10,
    index: 9,
  },
  {
    id: '7759e2d9ddfe32045c21566987d27106',
    created_at: '2024-01-16T03:34:33.070244Z',
    updated_at: '2024-01-16T03:34:33.070244Z',
    deleted_at: null,
    name: 'ND13',
    towerComponentId: '',
    towerTypeId: 'd8b4a1f423a0e5041baeb2ae4a49f07b',
    coordinates: { x: 102.675721, y: 26.622873 },
    towerType: { id: '', created_at: '0001-01-01T00:00:00Z', updated_at: '0001-01-01T00:00:00Z', deleted_at: null, name: '', filePath: '', terminalPoints: null },
    height: 21,
    orientation: 45,
    index: 14,
  },
  {
    id: 'b2a89b740910c17d2a0fde0a8d5c5b9e',
    created_at: '2024-01-16T03:34:33.070244Z',
    updated_at: '2024-01-16T03:34:33.070244Z',
    deleted_at: null,
    name: 'ND17',
    towerComponentId: '',
    towerTypeId: 'd8b4a1f423a0e5041baeb2ae4a49f07b',
    coordinates: { x: 102.682498, y: 26.624906 },
    towerType: { id: '', created_at: '0001-01-01T00:00:00Z', updated_at: '0001-01-01T00:00:00Z', deleted_at: null, name: '', filePath: '', terminalPoints: null },
    height: 36,
    orientation: 100,
    index: 18,
  },
  {
    id: '0f9f67bde6584c16b9e2a8bcbb128b5d',
    created_at: '2024-01-16T03:34:33.070244Z',
    updated_at: '2024-01-16T03:34:33.070244Z',
    deleted_at: null,
    name: 'ND9',
    towerComponentId: '',
    towerTypeId: 'f9802d638d152d19c3a5b53b7c2da6eb',
    coordinates: { x: 102.670324, y: 26.618168 },
    towerType: { id: '', created_at: '0001-01-01T00:00:00Z', updated_at: '0001-01-01T00:00:00Z', deleted_at: null, name: '', filePath: '', terminalPoints: null },
    height: 25,
    orientation: 10,
    index: 10,
  },
  {
    id: 'fe746c12a4ac25ebb3361a99b00e006e',
    created_at: '2024-01-16T03:34:33.070244Z',
    updated_at: '2024-01-16T03:34:33.070244Z',
    deleted_at: null,
    name: 'ND7',
    towerComponentId: '',
    towerTypeId: 'f9802d638d152d19c3a5b53b7c2da6eb',
    coordinates: { x: 102.669995, y: 26.614719 },
    towerType: { id: '', created_at: '0001-01-01T00:00:00Z', updated_at: '0001-01-01T00:00:00Z', deleted_at: null, name: '', filePath: '', terminalPoints: null },
    height: 25,
    orientation: 10,
    index: 8,
  },
  {
    id: '2d91f04415f0cf53fac9dbeeb30eff15',
    created_at: '2024-01-16T03:34:33.070244Z',
    updated_at: '2024-01-16T03:34:33.070244Z',
    deleted_at: null,
    name: 'ND15',
    towerComponentId: '',
    towerTypeId: 'd8b4a1f423a0e5041baeb2ae4a49f07b',
    coordinates: { x: 102.678509, y: 26.624241 },
    towerType: { id: '', created_at: '0001-01-01T00:00:00Z', updated_at: '0001-01-01T00:00:00Z', deleted_at: null, name: '', filePath: '', terminalPoints: null },
    height: 25,
    orientation: 45,
    index: 16,
  },
  {
    id: '438dbbd6c5025ee5fccd44eae9b34533',
    created_at: '2024-01-16T03:34:33.070244Z',
    updated_at: '2024-01-16T03:34:33.070244Z',
    deleted_at: null,
    name: 'ND5',
    towerComponentId: '',
    towerTypeId: 'f9802d638d152d19c3a5b53b7c2da6eb',
    coordinates: { x: 102.669933, y: 26.609935 },
    towerType: { id: '', created_at: '0001-01-01T00:00:00Z', updated_at: '0001-01-01T00:00:00Z', deleted_at: null, name: '', filePath: '', terminalPoints: null },
    height: 18,
    orientation: -30,
    index: 6,
  },
  {
    id: '3123beb911e5c901d5ff9ac04cafbe71',
    created_at: '2024-01-16T03:34:33.070244Z',
    updated_at: '2024-01-16T03:34:33.070244Z',
    deleted_at: null,
    name: 'ND2+1',
    towerComponentId: '',
    towerTypeId: 'f9802d638d152d19c3a5b53b7c2da6eb',
    coordinates: { x: 102.671823, y: 26.605102 },
    towerType: { id: '', created_at: '0001-01-01T00:00:00Z', updated_at: '0001-01-01T00:00:00Z', deleted_at: null, name: '', filePath: '', terminalPoints: null },
    height: 34,
    orientation: -45,
    index: 3,
  },
  {
    id: '9d2978380406cf870f31daa3333d3ada',
    created_at: '2024-01-16T03:34:33.070244Z',
    updated_at: '2024-01-16T03:34:33.070244Z',
    deleted_at: null,
    name: 'ND4',
    towerComponentId: '',
    towerTypeId: '18057ce68ef06a87ab7d94b11f5882fd',
    coordinates: { x: 102.670339, y: 26.608408 },
    towerType: { id: '', created_at: '0001-01-01T00:00:00Z', updated_at: '0001-01-01T00:00:00Z', deleted_at: null, name: '', filePath: '', terminalPoints: null },
    height: 15,
    orientation: -30,
    index: 5,
  },
  {
    id: '0a9b5e2f615dd1e87a7129ef8d9935b6',
    created_at: '2024-01-16T03:34:33.070244Z',
    updated_at: '2024-01-16T03:34:33.070244Z',
    deleted_at: null,
    name: 'ND11',
    towerComponentId: '',
    towerTypeId: 'd8b4a1f423a0e5041baeb2ae4a49f07b',
    coordinates: { x: 102.6729, y: 26.621488 },
    towerType: { id: '', created_at: '0001-01-01T00:00:00Z', updated_at: '0001-01-01T00:00:00Z', deleted_at: null, name: '', filePath: '', terminalPoints: null },
    height: 36,
    orientation: 45,
    index: 12,
  },
];

let wireByTower = [
  {
    id: '6dc6747d072648052a95ab5107163229',
    created_at: '2024-05-08T07:10:46.850336Z',
    updated_at: '2024-05-08T07:10:46.850336Z',
    deleted_at: null,
    splitWiresNum: 1,
    circuitId: '1回',
    phase: 'A',
    samplePoints: null,
    widths: null,
    diameter: null,
    terminalPoint: { x: -0.012982, y: -0.921504, z: 7.48247 },
  },
  {
    id: 'cbff8e6b8772f748ea21a5a72ad97738',
    created_at: '2024-05-08T07:10:46.850336Z',
    updated_at: '2024-05-08T07:10:46.850336Z',
    deleted_at: null,
    splitWiresNum: 1,
    circuitId: '1回',
    phase: 'B',
    samplePoints: null,
    widths: null,
    diameter: null,
    terminalPoint: { x: -0.012982, y: -0.92151, z: 8.61806 },
  },
  {
    id: '657d17620599d56ed876ee24da63eb77',
    created_at: '2024-05-08T07:10:46.850336Z',
    updated_at: '2024-05-08T07:10:46.850336Z',
    deleted_at: null,
    splitWiresNum: 1,
    circuitId: '1回',
    phase: 'C',
    samplePoints: null,
    widths: null,
    diameter: null,
    terminalPoint: { x: -0.012982, y: 0.903358, z: 7.48247 },
  },
];

let wireUnbound = [
  { id: 'fe4cf82cde42bc9b572051bb7c0e1e9e', created_at: '2025-04-22T07:21:37.249965Z', updated_at: '2025-04-22T07:21:37.249965Z', deleted_at: null, splitWiresNum: 12, circuitId: '21', phase: 'C', samplePoints: null, widths: null, diameter: null },
  { id: 'fe4cf82cde42bc9b572051bb7c0e13fa', created_at: '2025-04-22T07:21:37.249965Z', updated_at: '2025-04-22T07:21:37.249965Z', deleted_at: null, splitWiresNum: 12, circuitId: '21', phase: 'C', samplePoints: null, widths: null, diameter: null },
  { id: 'fe4cf82cde42bc9b572051bb7c0e18yh', created_at: '2025-04-22T07:21:37.249965Z', updated_at: '2025-04-22T07:21:37.249965Z', deleted_at: null, splitWiresNum: 12, circuitId: '21', phase: 'C', samplePoints: null, widths: null, diameter: null },
  { id: 'fe4cf82cde42bc9b572051bb7c0e1mnf', created_at: '2025-04-22T07:21:37.249965Z', updated_at: '2025-04-22T07:21:37.249965Z', deleted_at: null, splitWiresNum: 12, circuitId: '21', phase: 'C', samplePoints: null, widths: null, diameter: null },
  { id: 'fe4cf82cde42bc9b572051bb7c0e1bds', created_at: '2025-04-22T07:21:37.249965Z', updated_at: '2025-04-22T07:21:37.249965Z', deleted_at: null, splitWiresNum: 12, circuitId: '21', phase: 'C', samplePoints: null, widths: null, diameter: null },
];

let systemList = [
  {
    id: '22a0c218f23eda9b77a9a83a12f8f278',
    towerId: 'f73850b66aac43370196679b20d961ea',
    companyKey: ['deepsensing', 'esr', 'su_dao', 'huidong-sudao'],
    relativeLocation: { x: 2, y: 3, z: 7 },
    cmdId: 'DS_EITL_202400013',
    sensors: [
      { sensorType: 1, sensors: [{ id: '4f4e4437bb5c35ef20f2023a2413c1c9', cmdId: 'DS_EITL_202400013', systemId: '22a0c218f23eda9b77a9a83a12f8f278', index: 1, companykey: 'deepsensing', sensorType: 1, wireId: '', sn: '', appKey: '', appSecret: '' }] },
      { sensorType: 10, sensors: [{ id: '5991dbda2711c4c22765f1112379d2a2', cmdId: 'DS_EITL_202400013', systemId: '22a0c218f23eda9b77a9a83a12f8f278', index: 1, companykey: 'deepsensing', sensorType: 10, wireId: '657d17620599d56ed876ee24da63eb77', sn: '', appKey: '', appSecret: '' }] },
    ],
  },
  {
    id: 'bb0096c868d09d450de9b3d36745198f',
    towerId: 'f73850b66aac43370196679b20d961ea',
    companyKey: ['deepsensing', 'esr', 'su_dao', 'huidong-sudao'],
    relativeLocation: { x: 6, y: 8, z: 9 },
    cmdId: 'DS_EITL_202400012',
    sensors: [
      { sensorType: 10, sensors: [{ id: 'b6ff8bfe956a954a3c711fde701bb717', cmdId: 'DS_EITL_202400012', systemId: 'bb0096c868d09d450de9b3d36745198f', index: 1, companykey: 'deepsensing', sensorType: 10, wireId: '657d17620599d56ed876ee24da63eb77', sn: '', appKey: '', appSecret: '' }] },
      {
        sensorType: 4,
        sensors: [
          { id: '8ceb93dd1a2d428c8fc70d487c760ff8', cmdId: 'DS_EITL_202400012', systemId: 'bb0096c868d09d450de9b3d36745198f', index: 2, companykey: 'deepsensing', sensorType: 4, wireId: '', sn: '', appKey: '', appSecret: '' },
          { id: '3edf361da2ca79156d36c3f164c77fce', cmdId: 'DS_EITL_202400012', systemId: 'bb0096c868d09d450de9b3d36745198f', index: 1, companykey: 'deepsensing', sensorType: 4, wireId: '', sn: '', appKey: '', appSecret: '' },
        ],
      },
    ],
  },
];

let deviceBySystemList = [
  {
    id: '4f4e4437bb5c35ef20f2023a2413c1c9',
    created_at: '2024-01-18T06:32:17.252305Z',
    updated_at: '2024-01-18T06:32:17.252305Z',
    deleted_at: null,
    cmdId: 'DS_EITL_202400013',
    sn: '',
    systemId: '22a0c218f23eda9b77a9a83a12f8f278',
    index: 1,
    companykey: 'deepsensing',
    sensorType: 1,
    direction: false,
    wireId: '',
    wire: { id: '', created_at: '0001-01-01T00:00:00Z', updated_at: '0001-01-01T00:00:00Z', deleted_at: null, splitWiresNum: 0, circuitId: '', phase: '', samplePoints: null, widths: null, diameter: null },
    companyKeys: ['deepsensing', 'esr'],
    ezviz: { id: '', created_at: '0001-01-01T00:00:00Z', updated_at: '0001-01-01T00:00:00Z', deleted_at: null, phone: '', deviceSerial: '', sensorId: '' },
  },
  {
    id: '5991dbda2711c4c22765f1112379d2a2',
    created_at: '2024-06-07T03:00:29.102945Z',
    updated_at: '2024-06-07T03:00:29.102945Z',
    deleted_at: null,
    cmdId: 'DS_EITL_202400013',
    sn: '',
    systemId: '22a0c218f23eda9b77a9a83a12f8f278',
    index: 1,
    companykey: 'deepsensing',
    sensorType: 3,
    direction: false,
    wireId: '657d17620599d56ed876ee24da63eb77',
    wire: { id: '', created_at: '0001-01-01T00:00:00Z', updated_at: '0001-01-01T00:00:00Z', deleted_at: null, splitWiresNum: 0, circuitId: '', phase: '', samplePoints: null, widths: null, diameter: null },
    companyKeys: ['deepsensing'],
    ezviz: { id: '', created_at: '0001-01-01T00:00:00Z', updated_at: '0001-01-01T00:00:00Z', deleted_at: null, phone: '', deviceSerial: '', sensorId: '' },
  },
];

let currentUser = {
  UserInfo: {
    MasterCompany: {
      CreatedAt: '2022-10-28T06:56:25.434509Z',
      UpdatedAt: '2022-10-28T06:56:25.434509Z',
      deletedAt: null,
      desc: '',
      id: 3,
      key: 'deepsensing',
      name: '清蓉深瞳',
    },
    MasterRole: {
      CreatedAt: '2022-04-14T09:32:12.834181Z',
      UpdatedAt: '2022-07-07T03:21:42.733349Z',
      dataRoleId: null,
      defaultRouter: 'dashboard',
      deletedAt: null,
      id: 4,
      menus: null,
      roleKey: 'subadmin',
      roleName: '子公司管理员',
    },
    User: {
      CreatedAt: '2023-10-13T01:13:46.286194Z',
      UpdatedAt: '2023-10-13T01:13:46.286194Z',
      activeColor: '#1890ff',
      appletOpenid: '',
      applications: [
        {
          CreatedAt: '2024-05-22T02:19:05.111382Z',
          UpdatedAt: '2024-07-24T08:58:11.195738Z',
          deletedAt: null,
          icon: 'icon',
          id: 143,
          key: 'ems2c',
          name: '用户侧能量管理',
          status: 'dev',
        },
        {
          CreatedAt: '2023-07-27T06:47:14.330853Z',
          UpdatedAt: '2023-12-12T07:46:53.428187Z',
          deletedAt: null,
          icon: 'icon',
          id: 75,
          key: 'msvib',
          name: '振动传感器',
          status: 'dev',
        },
        {
          CreatedAt: '2023-08-29T07:29:53.360012Z',
          UpdatedAt: '2023-12-12T07:47:43.026298Z',
          deletedAt: null,
          icon: 'icon',
          id: 108,
          key: 'bhdz',
          name: 'BHDZ',
          status: 'dev',
        },
        {
          CreatedAt: '2022-07-25T08:01:58.580986Z',
          UpdatedAt: '2023-12-12T07:47:48.275398Z',
          deletedAt: null,
          icon: 'icon',
          id: 1,
          key: 'aqara',
          name: '插座系统',
          status: 'dev',
        },
        {
          CreatedAt: '2024-01-11T03:58:30.719018Z',
          UpdatedAt: '2024-04-20T01:16:17.067408Z',
          deletedAt: null,
          icon: 'icon',
          id: 141,
          key: 'deepgrid',
          name: 'SmartG',
          status: 'prod',
        },
      ],
      baseColor: '#fff',
      deletedAt: null,
      disabled: false,
      headerImg: '',
      id: 140,
      loginErrorNumber: 0,
      loginErrorTime: '0001-01-01T00:00:00Z',
      nickName: '一君',
      openid: '11111111',
      phoneNumber: '',
      phoneVerify: false,
      sideMode: 'dark',
      unionid: 'as',
      userName: '',
      uuid: '1111b',
    },
  },
};

let ledger = {
  name: 'hn-cs',
  companyKey: ['deepsensing', 'atm_91430102MA4TBKNYX0'],
  terrainPath: '',
  splitWiresCnt: 0,
  voltageLevel: '10000',
  coordinates: {
    x: 13.6789,
    y: 45.5678,
  },
  linePoints: [
    {
      pointId: 'a613eb1a7f9326ca4d18c13d11f9c378',
      name: 'test1',
      position: [115.579986, 37.294554, -89],
      pointType: '',
      height: 81,
      index: 1,
      filePath:
        'https://deepsensing-1307225140.cos.ap-shanghai.myqcloud.com/deepgrid/towerType/tower1.glb?x-cos-security-token=gnw80WfGJM19zW2NgRcLYv0Hk4qtKLIa8652cef6c01c5492af038b8b6e9f489eMd5WRSbwEMe52NJjLlqOODIirE792BtCsUCUilhvmjON9Ifw1sqPmtp11YBrFyrHxUgGX2sfSu-3_xQ-nAeS8VrF32mljwj7XRQoAqn8Lg7iJB1ovAm4tjCeUcZgmYaZkf2pD-KsAj8W01jjQJPFai2TnOpYnIQoJqxhbGf74IDY4CCAiag-cotF0mGK_1QIDW6ofLouBFA9vRunkFtwBsgJUVS3X6r5HqRRw-x1hLVTBmCdkAfQ0-X7kADO-tPIb8HM39eLXLU-WK603V1PuA1FHk8sXwFJEPDf44oJE6wzKYhRz5fvaVd-iUHanjWh\u0026q-sign-algorithm=sha1\u0026q-ak=AKIDEV3fjZ481XyR2P81hDPrm2tX3LGxbchs7mVNkxTog8KNDz7892M2tCJl4T1QjmUj\u0026q-sign-time=1748311556%3B1748315156\u0026q-key-time=1748311556%3B1748315156\u0026q-header-list=host\u0026q-url-param-list=x-cos-security-token\u0026q-signature=5b1e8d81bbf75cc59704ff32cd036afb67601ad5',
      wireInfo: {
        '1': {
          id: '3657596dddec389ab9f38765076223c2',
          created_at: '2024-12-24T07:20:38.513679Z',
          updated_at: '2024-12-24T07:20:38.513679Z',
          deleted_at: null,
          splitWiresNum: 1,
          circuitId: '1回',
          phase: 'A',
          samplePoints: null,
          widths: null,
          diameter: null,
          xyzPoint: { x: 0, y: -27, z: 52 },
        },
        '2': {
          id: 'dbc026568e37b87420c9ed0d35f53748',
          created_at: '2024-12-24T07:20:38.513679Z',
          updated_at: '2024-12-24T07:20:38.513679Z',
          deleted_at: null,
          splitWiresNum: 1,
          circuitId: '1回',
          phase: 'C',
          samplePoints: null,
          widths: null,
          diameter: null,
          xyzPoint: { x: 0, y: 0, z: 52 },
        },
      },
      systemList: [
        {
          id: 'b06c9eec4822880b18cd52a8aa16e8fb',
          towerId: 'a613eb1a7f9326ca4d18c13d11f9c378',
          companyKey: ['esr', 'deepsensing', 'atm_91430102MA4TBKNYX0'],
          relativeLocation: { x: 6, y: 8, z: 9 },
          cmdId: 'DS_EITL_202400093',
          sensors: [
            {
              sensorType: 21,
              sensors: [
                {
                  id: '47f81f43b32550d950338446383f10ce',
                  cmdId: 'DS_EITL_202400093',
                  systemId: 'b06c9eec4822880b18cd52a8aa16e8fb',
                  index: 1,
                  companykey: 'deepsensing',
                  sensorType: 21,
                  wireId: '3657596dddec389ab9f38765076223c2',
                  sn: 'FS8501884',
                  appKey: 'cdb1c76588504e2596d5e27aae7ff4f5',
                  appSecret: '23126810390583972a6d665e49ff7b3e',
                },
              ],
            },
            {
              sensorType: 1,
              sensors: [
                {
                  id: '47f81f43b32550d950338446383f10ce',
                  cmdId: 'DS_EITL_202400093',
                  systemId: 'b06c9eec4822880b18cd52a8aa16e8fb',
                  index: 1,
                  companykey: 'deepsensing',
                  sensorType: 1,
                  wireId: '3657596dddec389ab9f38765076223c2',
                  sn: 'FS8501884',
                  appKey: 'cdb1c76588504e2596d5e27aae7ff4f5',
                  appSecret: '23126810390583972a6d665e49ff7b3e',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      pointId: 'a613eb1a7f9326ca4d18c13d11f9c370',
      name: 'test2',
      position: [115.579986, 37.294554, -89],
      pointType: '',
      height: 81,
      index: 1,
      filePath:
        'https://deepsensing-1307225140.cos.ap-shanghai.myqcloud.com/deepgrid/towerType/tower1.glb?x-cos-security-token=gnw80WfGJM19zW2NgRcLYv0Hk4qtKLIa8652cef6c01c5492af038b8b6e9f489eMd5WRSbwEMe52NJjLlqOODIirE792BtCsUCUilhvmjON9Ifw1sqPmtp11YBrFyrHxUgGX2sfSu-3_xQ-nAeS8VrF32mljwj7XRQoAqn8Lg7iJB1ovAm4tjCeUcZgmYaZkf2pD-KsAj8W01jjQJPFai2TnOpYnIQoJqxhbGf74IDY4CCAiag-cotF0mGK_1QIDW6ofLouBFA9vRunkFtwBsgJUVS3X6r5HqRRw-x1hLVTBmCdkAfQ0-X7kADO-tPIb8HM39eLXLU-WK603V1PuA1FHk8sXwFJEPDf44oJE6wzKYhRz5fvaVd-iUHanjWh\u0026q-sign-algorithm=sha1\u0026q-ak=AKIDEV3fjZ481XyR2P81hDPrm2tX3LGxbchs7mVNkxTog8KNDz7892M2tCJl4T1QjmUj\u0026q-sign-time=1748311556%3B1748315156\u0026q-key-time=1748311556%3B1748315156\u0026q-header-list=host\u0026q-url-param-list=x-cos-security-token\u0026q-signature=5b1e8d81bbf75cc59704ff32cd036afb67601ad5',
      wireInfo: {
        '1': {
          id: '3657596dddec389ab9f38765076223c2',
          created_at: '2024-12-24T07:20:38.513679Z',
          updated_at: '2024-12-24T07:20:38.513679Z',
          deleted_at: null,
          splitWiresNum: 1,
          circuitId: '1回',
          phase: 'A',
          samplePoints: null,
          widths: null,
          diameter: null,
          xyzPoint: { x: 0, y: -27, z: 52 },
        },
        '2': {
          id: 'dbc026568e37b87420c9ed0d35f53748',
          created_at: '2024-12-24T07:20:38.513679Z',
          updated_at: '2024-12-24T07:20:38.513679Z',
          deleted_at: null,
          splitWiresNum: 1,
          circuitId: '1回',
          phase: 'C',
          samplePoints: null,
          widths: null,
          diameter: null,
          xyzPoint: { x: 0, y: 0, z: 52 },
        },
      },
      systemList: [
        {
          id: 'fe74e2369215dc7fcbce013009505674',
          towerId: 'a613eb1a7f9326ca4d18c13d11f9c378',
          companyKey: ['esr', 'deepsensing', 'atm_91430102MA4TBKNYX0'],
          relativeLocation: { x: 6, y: 8, z: 9 },
          cmdId: 'DS_EITL_202400094',
          sensors: [
            { sensorType: 30, sensors: [{ id: 'e2fcb547e0984b340ca4dfc7e61162e1', cmdId: 'DS_EITL_202400092', systemId: 'fe74e2369215dc7fcbce013009505675', index: 1, companykey: 'deepsensing', sensorType: 30, wireId: '3657596dddec389ab9f38765076223c2', sn: '', appKey: '', appSecret: '' }] },
          ],
        },
      ],
    },
  ],
};

let controlLog = [
  {
    ID: 3,
    CreatedAt: '2025-05-09T15:58:02.214364+08:00',
    UpdatedAt: '2025-05-09T15:58:02.214364+08:00',
    DeletedAt: null,
    userId: '1',
    roleKey: 'subadmin',
    companyKey: 'deepsensing',
    cmdId: 'DS_EITL_202400081',
    systemId: 'ae9f2bb12d7ddd2011544f04411979b5',
    protocolType: 1,
    frameType: 0,
    packageType: 223,
    controlType: 1,
    params: { Params: { motorRunTime: 20, sensorNo: 255, sensorType: 30, setMotorMode: 255, wireFrequency: 18 } },
    success: true,
  },
  {
    ID: 2,
    CreatedAt: '2025-05-09T15:33:27.661257+08:00',
    UpdatedAt: '2025-05-09T15:33:27.661257+08:00',
    DeletedAt: null,
    userId: '1',
    roleKey: 'subadmin',
    companyKey: 'deepsensing',
    cmdId: 'DS_EITL_202400081',
    systemId: 'ae9f2bb12d7ddd2011544f04411979b5',
    protocolType: 1,
    frameType: 0,
    packageType: 223,
    controlType: 1,
    params: { Params: { motorRunTime: 20, sensorNo: 255, sensorType: 30, setMotorMode: 255, wireFrequency: 18 } },
    success: false,
  },
  {
    ID: 1,
    CreatedAt: '2025-05-09T15:07:13.058227+08:00',
    UpdatedAt: '2025-05-09T15:07:13.058227+08:00',
    DeletedAt: null,
    userId: '1',
    roleKey: 'subadmin',
    companyKey: 'deepsensing',
    cmdId: 'DS_EITL_202400081',
    systemId: 'ae9f2bb12d7ddd2011544f04411979b5',
    protocolType: 1,
    frameType: 0,
    packageType: 223,
    controlType: 1,
    params: { Params: { motorRunTime: 20, sensorNo: 255, sensorType: 30, setMotorMode: 255, wireFrequency: 18 } },
    success: false,
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
    const aramType = { 1: { name: '覆冰', desc: '' }, 2: { name: '大风', desc: '' }, 3: { name: '暴雨', desc: '' } };
    return { data: aramType, msg: 'ok' };
  }
  getDeviceType() {
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
      const captcha = svgCaptcha.create({ size: 4, ignoreChars: '0o1i', noise: 2, color: true, fontSize: 50, width: 100, height: 40, background: '#cc9966' });
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
  deleteLine(lineId: string) {
    lines = lines.filter((item) => item.id !== lineId);
    return { data: lineId, msg: '操作成功' };
  }
  getTowerType() {
    return { data: towerTypeInfo, msg: '操作成功' };
  }
  getTowerList(lineId: string) {
    console.log('lineId', lineId);
    return { data: towerList, msg: '操作成功' };
  }
  getWireByTower(towerId: string) {
    console.log('towerId', towerId);
    return { data: wireByTower, msg: '操作成功' };
  }
  addTower(val: any[]) {
    console.log('val', val);
    const ids = val.map(() => generateRandomString(32));
    return { data: ids, msg: '操作成功' };
  }
  addTowerLine(val: any[]) {
    return { data: null, msg: '操作成功' };
  }
  editTowerLine(val: any) {
    return { data: null, msg: '操作成功' };
  }
  getUnboundWire() {
    return { data: wireUnbound, msg: '操作成功' };
  }
  addWire(val: { circuitId: string; phase: string; splitWiresNum: number }[]) {
    const time = new Date().toISOString();
    const ids = val.map((item) => {
      let obj = { id: generateRandomString(32), created_at: time, updated_at: time, deleted_at: null, ...item, samplePoints: null, widths: null, diameter: null };
      return obj;
    });
    wireUnbound = [...wireUnbound, ...ids];
    return { data: ids, msg: '操作成功' };
  }
  getSystemByTower(towerId: string) {
    return { data: systemList, msg: '操作成功' };
  }
  getDeviceBySystem(cmdId: string) {
    console.log('cmdId', cmdId);
    if (cmdId) return { data: deviceBySystemList, msg: '操作成功' };
    else return { data: [], msg: '参数异常' };
  }
  getAllDevice() {
    return {
      data: [
        { index: 1, sensorType: 21, id: 'd210a2858ac70bc89edd24a90af8c71c', sn: 'FN5802557', cmdId: 'DS_EITL_202400081', companyKeys: ['deepeneing'], systemId: 'qweqeqwesdefasdawdadw' },
        { index: 1, sensorType: 30, id: '2', sn: 'FN5802557', cmdId: 'DS_EITL_202400082', companyKeys: ['deepeneing'], systemId: 'ouytdxcnkfrvyauwa1293' },
      ],
      msg: '操作成功',
    };
  }
  addDevice(val: any) {
    return { data: null, msg: '操作成功' };
  }
  editDevice(val: any) {
    const num = Math.floor(Math.random() * 10);
    return { data: null, msg: num < 5 ? '操作成功' : '操作失败' };
  }
  deleteDevice(val: any) {
    const num = Math.floor(Math.random() * 10);
    return { data: null, msg: num < 5 ? '操作成功' : '操作失败' };
  }
  getCurrentUser() {
    return { data: { Data: currentUser }, msg: '操作成功' };
  }
  getCompleteLineList(lineId: string) {
    console.log('完整台账lineId', lineId);
    return { data: ledger, msg: '操作成功' };
  }
  getTowerControlRecord(val: { page: number; pageSize: number; towerId: string }) {
    return { data: { list: controlLog, total: 3, page: val.page, pageSize: val.pageSize }, msg: '操作成功' };
  }
  getEzvizAccessToken(diviceId: string) {
    // 模拟获取设备的访问令牌
    return { data: 'at.44co1sj89s4l0q9126aacy8h6uqm86cu-7sngfrjfpn-0aw5ci7-kjofbgwli', msg: '操作成功' };
  }
  getDataByDeviceType(val: { dataType: number; start: string; end: string; frameType: number; params?: Record<string, any>; protocolType: number; systemId: string }) {
    switch (val.dataType) {
      case 1: // 微气象监测
        return {
          data: [
            {
              time: '2025-05-28T09:52:43Z',
              cmdId: 'DS_EITL_202400013',
              systemId: '22a0c218f23eda9b77a9a83a12f8f278',
              sensorNum: null,
              componentId: 'DS_EITL_202400013',
              averageWindSpeed10min: 8.2,
              averageWindDirection10min: 73,
              maxWindSpeed: 8.2,
              extremeWindSpeed: 8.2,
              standardWindSpeed: 0,
              airTemperature: 10.1,
              humidity: 93,
              airPressure: 731.2,
              precipitation: 15.8,
              precipitationIntensity: 1.58,
              radiationIntensity: 0,
            },
            {
              time: '2025-05-28T09:42:42Z',
              cmdId: 'DS_EITL_202400013',
              systemId: '22a0c218f23eda9b77a9a83a12f8f278',
              sensorNum: null,
              componentId: 'DS_EITL_202400013',
              averageWindSpeed10min: 8.2,
              averageWindDirection10min: 72,
              maxWindSpeed: 8.2,
              extremeWindSpeed: 8.2,
              standardWindSpeed: 0,
              airTemperature: 10.1,
              humidity: 92,
              airPressure: 731.2,
              precipitation: 15.6,
              precipitationIntensity: 1.5600001,
              radiationIntensity: 0,
            },
          ],
          msg: '操作成功',
        };
      case 11: // 海康摄像头-照片
        //拿public的静态图片做测试
        const list = [
          { pictureUrl: 'http://localhost:3001/image.png' },
          { pictureUrl: 'http://localhost:3001/image.png' },
          { pictureUrl: 'http://localhost:3001/image.png' },
          { pictureUrl: 'http://localhost:3001/image.png' },
          { pictureUrl: 'http://localhost:3001/image.png' },
          { pictureUrl: 'http://localhost:3001/image.png' },
        ];
        return { data: { pageSize: 10, page: 1, total: 10, list }, msg: '操作成功' };
      case 19: // 电机2.0
        return { data: [{ motorState: 255 }], msg: '操作成功' }; // 返回空数据
    }
  }
  postEzvizMonitor(val: Record<string, string>) {
    console.log('val', val);
    return { data: null, msg: '操作成功' };
  }
  getMotorHardware() {
    return {
      data: {
        motorRunTime: 20,
        sensorNo: 255,
        sensorType: 30,
        setMotorMode: 255,
        wireFrequency: 18,
      },
      msg: '操作成功',
    };
  }
  getMotorParams(val: string) {
    return {
      data: {
        motorRunTime: 20,
        sensorNo: 255,
        sensorType: 30,
        setMotorMode: 255,
        wireFrequency: 18,
      },
      msg: '操作成功',
    };
  }
  postMotorControl(val: any) {
    console.log('电机控制参数', val);
    return { data: null, msg: '操作成功' };
  }
}
