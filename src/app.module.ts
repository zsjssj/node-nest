import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgreSqlModule } from './postgre-sql/postgre-sql.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';

const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`;

console.log(`当前环境变量文件: ${envFilePath}`);

@Module({
  imports: [
    UserModule,
    RoleModule,
    AuthModule,
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath,
    //   load: [],
    //   validationSchema: Joi.object({
    //     NODE_ENV: Joi.string().valid('development', 'production').default('development'),
    //     DB: Joi.string().required(),
    //     SERVER_URL: Joi.string(),
    //     SERVER_PORT: Joi.number().default(3000),
    //   }),
    // }),
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
    PostgreSqlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
