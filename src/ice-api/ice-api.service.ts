import { Injectable } from '@nestjs/common';
import { CreateIceApiDto } from './dto/create-ice-api.dto';
import { UpdateIceApiDto } from './dto/update-ice-api.dto';

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
}
