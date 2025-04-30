import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IceApiService } from './ice-api.service';
import { CreateIceApiDto } from './dto/create-ice-api.dto';
import { UpdateIceApiDto } from './dto/update-ice-api.dto';
import { get } from 'http';

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
  }
  @Get('/constant/device/type')
  getDeviceType() {
    return this.iceApiService.getDeviceType();
  }
}
