import { Module } from '@nestjs/common';
import { PostgreSqlService } from './postgre-sql.service';
import { PostgreSqlController } from './postgre-sql.controller';
import { PostgreSql } from './entities/postgre-sql.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PostgreSql])],
  controllers: [PostgreSqlController],
  providers: [PostgreSqlService],
  exports: [PostgreSqlService],
})
export class PostgreSqlModule {}
