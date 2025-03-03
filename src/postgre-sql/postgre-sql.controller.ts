import { Controller, Get, Post, Query } from '@nestjs/common'
import { PostgreSqlService } from './postgre-sql.service'

@Controller('locations')
export class PostgreSqlController {
  constructor(private readonly locationService: PostgreSqlService) {}

  @Post('create')
  async create(@Query('lng') lng: number, @Query('lat') lat: number) {
    return this.locationService.createLocation(lng, lat)
  }

  @Get('nearby')
  async findNearby(@Query('lng') lng: number, @Query('lat') lat: number, @Query('distance') distance: number) {
    return this.locationService.findNearby(lng, lat, distance)
  }
}
