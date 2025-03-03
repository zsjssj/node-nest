import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { Point } from 'geojson'

@Entity()
export class PostgreSql {
  @PrimaryGeneratedColumn()
  id: number

  @Column('geometry', { spatialFeatureType: 'Point', srid: 4326 })
  coordinates: Point
}
