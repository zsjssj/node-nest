import { Controller, Get, Post, Query } from '@nestjs/common'
import { PostgreSqlService } from './postgre-sql.service'

@Controller({ path: 'postgre-sql', version: '1' })
export class PostgreSqlController {
  constructor(private readonly locationService: PostgreSqlService) {}

  @Post('create')
  async create(@Query('lng') lng: number, @Query('lat') lat: number) {
    console.log('/postgre-sql/create', new Date(), lng, lat)
    return this.locationService.createLocation(lng, lat)
  }

  @Get('nearby')
  async findNearby(@Query('lng') lng: number, @Query('lat') lat: number, @Query('distance') distance: number) {
    console.log('/postgre-sql/nearby', new Date())
    return this.locationService.findNearby(lng, lat, distance)
  }
}
