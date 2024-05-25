import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Room } from 'src/room/entities/room.entity';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '<YOUR_DATABASE_PASSWORD>',
    database: 'goaltracker-db',
    entities: [Room],
    synchronize: true,
  }),
);