import { DynamicModule, Module } from '@nestjs/common';
import { FCMService } from './fcm.service';
import {
  FCMOptionsSymbol,
  TypeFCMAsyncOptions,
  type TypeFCMOptions,
} from './types/fcm.type';
@Module({
  providers: [FCMService],
})
export class FCMModule {
  public static register(options: TypeFCMOptions): DynamicModule {
    return {
      module: FCMModule,
      providers: [{ provide: FCMOptionsSymbol, useValue: options }, FCMService],
      exports: [FCMService],
      global: true,
    };
  }
  public static registerAsync(options: TypeFCMAsyncOptions): DynamicModule {
    return {
      module: FCMModule,
      imports: options.imports || [],
      providers: [
        {
          provide: FCMOptionsSymbol,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        FCMService,
      ],
      exports: [FCMService],
      global: true,
    };
  }
}
