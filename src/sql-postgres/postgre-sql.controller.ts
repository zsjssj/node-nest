import { Body, Controller, Get, ParseFloatPipe, ParseIntPipe, Post, Query, ValidationPipe } from '@nestjs/common';
import { PostgreSqlService } from './postgre-sql.service';
import { CreatePostgreSqlDto } from './dto/create-postgre-sql.dto';
import dayjs from 'dayjs';

@Controller({ path: 'postgres', version: '1' })
export class PostgreSqlController {
  constructor(private readonly locationService: PostgreSqlService) {}

  @Post('create')
  async create(@Body(ValidationPipe) CreatePostgreSqlDtoData: CreatePostgreSqlDto) {
    const { lng, lat, title, info } = CreatePostgreSqlDtoData;
    console.log('postgres/create', dayjs().format('YYYY-MM-DD HH:mm:ss'), lng, lat);
    return this.locationService.createLocation({ lng, lat, title, info });
  }

  @Get('nearby')
  async findNearby(@Query('lng', ParseFloatPipe) lng: number, @Query('lat', ParseFloatPipe) lat: number, @Query('distance', ParseFloatPipe) distance: number) {
    console.log('postgres/nearby', dayjs().format('YYYY-MM-DD HH:mm:ss'));
    // await new Promise((resolve) => setTimeout(resolve, 5000)); // 模拟延迟
    return this.locationService.findNearby(lng, lat, distance);
  }
}
