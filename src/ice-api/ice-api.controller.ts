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
  @Get('administrations/resources/token')
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
}
