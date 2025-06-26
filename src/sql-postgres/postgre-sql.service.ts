import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostgreSqlDto } from './dto/create-postgre-sql.dto';
import { PostgreSql } from './entities/postgre-sql.entity';
import { Point } from 'geojson';
import * as wkx from 'wkx';

@Injectable()
export class PostgreSqlService {
  constructor(
    @InjectRepository(PostgreSql)
    private locationRepository: Repository<PostgreSql>,
  ) {}

  // 创建一个地理位置
  async createLocation({ lng, lat, title, info }: CreatePostgreSqlDto) {
    const location = new PostgreSql();
    location.coordinates = { type: 'Point', coordinates: [lng, lat] } as Point;
    location.title = title;
    location.info = info;
    return this.locationRepository.save(location);
  }

  // 查询附近的点
  async findNearby(lng: number, lat: number, distance: number) {
    const locations = await this.locationRepository.query(`SELECT * FROM postgre_sql WHERE ST_DWithin(coordinates, ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography, $3)`, [lng, lat, distance]);
    return locations.map((location: any) => {
      const coordinates = wkx.Geometry.parse(Buffer.from(location.coordinates, 'hex')).toGeoJSON(); // 解析 WKB
      return {
        id: location.id,
        title: location.title,
        info: location.info,
        coordinates: coordinates['coordinates'], // 解析 WKB
      };
    });
  }
}
