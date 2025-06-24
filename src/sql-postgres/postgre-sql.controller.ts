import { Controller, Get, Post, Query } from '@nestjs/common';
import { PostgreSqlService } from './postgre-sql.service';
import dayjs from 'dayjs';

@Controller({ path: 'postgres', version: '1' })
export class PostgreSqlController {
  constructor(private readonly locationService: PostgreSqlService) {}

  @Post('create')
  async create(@Query('lng') lng: number, @Query('lat') lat: number) {
    console.log('postgres/create', dayjs().format('YYYY-MM-DD HH:mm:ss'), lng, lat);
    return this.locationService.createLocation(lng, lat);
  }

  @Get('nearby')
  async findNearby(@Query('lng') lng: number, @Query('lat') lat: number, @Query('distance') distance: number) {
    console.log('postgres/nearby', dayjs().format('YYYY-MM-DD HH:mm:ss'));
    return this.locationService.findNearby(lng, lat, distance);
  }
}
