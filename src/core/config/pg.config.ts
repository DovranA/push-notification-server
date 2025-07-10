import { ConfigService } from '@nestjs/config';
import { TypePgOptions } from 'src/pg/types/pg.type';

export function getPgConfig(configService: ConfigService): TypePgOptions {
  return {
    database: configService.getOrThrow<string>('POSTGRES_DB'),
    host: configService.getOrThrow<string>('POSTGRES_HOST'),
    password: configService.getOrThrow<string>('POSTGRES_PASSWORD'),
    port: configService.getOrThrow<number>('POSTGRES_PORT'),
    user: configService.getOrThrow<string>('POSTGRES_USER'),
  };
}
