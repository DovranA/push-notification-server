import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { FCMModule } from 'src/modules/libs/fcm/fcm.module';
import { getFCMConfig } from './config/fcm.config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './config/type-orm.config';
import { TokenModule } from 'src/modules/token/token.module';
import { NotificationModule } from 'src/modules/notification/notification.module';

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
    TokenModule,
    NotificationModule,
  ],
})
export class CoreModule {}
