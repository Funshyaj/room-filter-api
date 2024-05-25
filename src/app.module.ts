import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ormConfig from './config/orm.config';
import ormConfigProd from './config/orm.config.prod';
import { Room } from './room/entities/room.entity';
import { RoomModule } from './room/room.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      // load: [ormConfig],
      // expandVariables: true,
    }),
    // TypeOrmModule.forRootAsync({
    //   useFactory:
    //     process.env.NODE_ENV !== 'production' ? ormConfig : ormConfigProd,
    // }),
    RoomModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
