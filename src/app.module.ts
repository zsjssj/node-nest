import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostgreSqlModule } from './sql-postgres/postgre-sql.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    UserModule,
    PostgreSqlModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '521421',
      database: 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
      dropSchema: false,
      // keepConnectionAlive: true,
    }),
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
