import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FCMModule } from 'src/fcm/fcm.module';
import { getFCMConfig } from 'src/configs/fcm.config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from 'src/configs/type-orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FCMModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getFCMConfig,
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getTypeOrmConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
