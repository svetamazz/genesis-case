import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  synchronize: false,
  host: configService.get('MYSQLDB_HOST'),
  port: configService.get('MYSQLDB_PORT'),
  username: configService.get('MYSQLDB_USER'),
  password: configService.get('MYSQLDB_PASSWORD'),
  database: configService.get('MYSQLDB_DATABASE'),
  entities: [`${__dirname}/../src/**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
});
