import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Query, Put } from '@nestjs/common';
import { IceApiService } from './ice-api.service';
import { CreateIceApiDto } from './dto/create-ice-api.dto';
import { UpdateIceApiDto } from './dto/update-ice-api.dto';

@Controller('ice-api')
export class IceApiController {
  constructor(private readonly iceApiService: IceApiService) {}

  @Post()
  create(@Body() createIceApiDto: CreateIceApiDto) {
    return this.iceApiService.create(createIceApiDto);
  }

  @Get()
  findAll() {
    return this.iceApiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.iceApiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIceApiDto: UpdateIceApiDto) {
    return this.iceApiService.update(+id, updateIceApiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.iceApiService.remove(+id);
  }

  @Get('/constant/aram/type')
  getAramType() {
    return this.iceApiService.getAramType();
    // throw new BadRequestException('请求错误');
  }
  @Get('/constant/device/type')
  getDeviceType() {
    return this.iceApiService.getDeviceType();
    // throw new BadRequestException('请求错误');
  }

  @Get('aram/realTimeData/:id')
  getAramRealTimeData(@Param('id') id: string) {
    return this.iceApiService.getAramRealTimeData(id);
  }

  //用户相关
  @Get('/users/captcha')
  getCaptcha() {
    return { data: this.iceApiService.createCode(), msg: 'ok' };
  }
  @Get('/company/resources/token')
  getAdministrations() {
    // throw new BadRequestException('请求错误');
    return this.iceApiService.getAdministrations();
  }
  @Get('/users/resources/list')
  async getUserList(@Query('page') page: string, @Query('pageSize') pageSize: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return this.iceApiService.getUserList({ page, pageSize });
  }
  @Get('/roles/resources')
  getRoleList() {
    return this.iceApiService.getRoleList();
  }
  @Put('/users/resources')
  async updateUser(@Body() body: any) {
    // throw new BadRequestException('请求错误');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return this.iceApiService.updateUser(body);
  }
  @Post('users/resources')
  async addUser(@Body() body: any) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return this.iceApiService.addUser(body);
  }

  @Delete('/users/resources/physically')
  async deleteUserFover(@Query('userIds') userIds: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return this.iceApiService.deleteUserFover(userIds);
  }
  @Delete('/users/resources')
  async deleteUser(@Query('userIds') userIds: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return this.iceApiService.deleteUser(userIds);
  }
  @Put('/users/resources/recover')
  async putRecover(@Query('userIds') userIds: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return this.iceApiService.putRecover(userIds);
  }
  //获取线路台账
  @Get('/lines/resources')
  async getLineList() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return this.iceApiService.getLineList();
  }
  @Delete('/lines/resources/:lineId')
  async deleteLine(@Param('lineId') lineId: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return this.iceApiService.deleteLine(lineId);
  }
  @Get('/towerType/resources')
  async getTowerType() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return this.iceApiService.getTowerType();
  }
  @Get('/towers/resources/:lineId')
  async getTowerList(@Param('lineId') lineId: string) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return this.iceApiService.getTowerList(lineId);
  }
  @Get('wires/resources/:towerId')
  async getWireByTower(@Param('towerId') towerId: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return this.iceApiService.getWireByTower(towerId);
  }
  @Post('/towers/resources')
  async addTower(@Body() body: any) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return this.iceApiService.addTower(body);
  }
  @Post('/towerLineRelationships/resources')
  async addTowerLine(@Body() body: any) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return this.iceApiService.addTowerLine(body);
  }
  @Put('/towers/resources')
  async editTowerLine(@Body() body: any) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return this.iceApiService.editTowerLine(body);
  }
  @Get('/wires/resources/unbound')
  async getUnboundWire() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return this.iceApiService.getUnboundWire();
  }
  @Post('/wires/resources')
  async addWire(@Body() body: any) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return this.iceApiService.addWire(body);
  }

  //获取塔下系统
  @Get('/systems/resources/tower-id')
  async getSystemByTower(@Query('towerId') towerId: string) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return this.iceApiService.getSystemByTower(towerId);
  }
  //获取系统下的设备
  @Get('/sensors/resources/cmd-id/:cmdId')
  async getDeviceBySystem(@Param('cmdId') cmdId: string) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return this.iceApiService.getDeviceBySystem(cmdId);
  }
  //添加设备
  @Post('/sensors/resources')
  async addDevice(@Body() body: any) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return this.iceApiService.addDevice(body);
  }
  //修改设备
  @Put('/sensors/resources/id')
  async editDevice(@Body() body: any) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return this.iceApiService.editDevice(body);
  }
  //删除设备
  @Delete('/sensors/resources/ids')
  async deleteDevice(@Body('ids') body: any) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return this.iceApiService.deleteDevice(body);
  }
}
