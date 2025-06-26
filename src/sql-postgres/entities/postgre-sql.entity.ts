import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Point } from 'geojson';

@Entity()
export class PostgreSql {
  @PrimaryGeneratedColumn()
  id: number;

  //创建时间
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  //更新时间
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column('geometry', { spatialFeatureType: 'Point', srid: 4326 })
  coordinates: Point;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  info?: string;
}
