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
        Node: { Id: 1294, ElementId: '1294', Labels: ['Administration'], Props: { companyKey: 'esr', createdAt: {}, name: '诺特', objectId: '8e52ba674c87f6ef81b919d39d725ed3' } },
        name: '诺特',
        labels: ['Administration'],
        fullPath: '',
        masterLabel: 'Administration',
        children: null,
        region: { name: '', objectId: '', adcode: 0, regionLevel: '', children: null, substation: null },
        ratedCurrent: 0,
        ratedPower: 0,
        fieldMap: { companyKey: 'esr', createdAt: {}, name: '诺特', objectId: '8e52ba674c87f6ef81b919d39d725ed3' },
      },
      {
        objectId: '5cfb209e844637d4d6efb189fca79083',
        createdAt: '2023-11-17T16:28:22.087683Z',
        Node: { Id: 1386, ElementId: '1386', Labels: ['Administration'], Props: { companyKey: 'su_dao', createdAt: {}, name: 'w我的测试', objectId: '5cfb209e844637d4d6efb189fca79083' } },
        name: 'w我的测试',
        labels: ['Administration'],
        fullPath: '',
        masterLabel: 'Administration',
        children: null,
        region: { name: '', objectId: '', adcode: 0, regionLevel: '', children: null, substation: null },
        ratedCurrent: 0,
        ratedPower: 0,
        fieldMap: { companyKey: 'su_dao', createdAt: {}, name: 'w我的测试', objectId: '5cfb209e844637d4d6efb189fca79083' },
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
    const deviceType = [
      { sensorTypeName: '微气象监测', sensorType: 1, protocolType: 1, dataTypeMap: { '0': [1] }, alarmTypes: [12, 7, 6] },
      { sensorTypeName: '杆塔倾斜监测', sensorType: 2, protocolType: 1, dataTypeMap: { '0': [2] }, alarmTypes: [8] },
      { sensorTypeName: '微风振动', sensorType: 3, protocolType: 1, dataTypeMap: { '0': [3, 4, 217] }, alarmTypes: [14] },
      { sensorTypeName: '导线舞动监测', sensorType: 5, protocolType: 1, dataTypeMap: { '0': [9] }, alarmTypes: [9] },
      { sensorTypeName: 'MP110', sensorType: 11, protocolType: 1, dataTypeMap: { '0': [11] }, alarmTypes: [11] },
      { sensorTypeName: '海康摄像头', sensorType: 21, protocolType: 1, dataTypeMap: { '0': [11] }, alarmTypes: [11] },
      { sensorTypeName: '通道可视化', sensorType: 9, protocolType: 1, dataTypeMap: { '0': [11] }, alarmTypes: [11] },
    ];
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
}
