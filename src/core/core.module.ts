import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { FCMModule } from 'src/module/libs/fcm/fcm.module';
import { getFCMConfig } from './config/fcm.config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './config/type-orm.config';

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
})
export class CoreModule {}
