import { ConfigService } from '@nestjs/config';
import { TypeFCMOptions } from 'src/modules/libs/fcm/types/fcm.type';

export function getFCMConfig(configService: ConfigService): TypeFCMOptions {
  const projectId = configService.getOrThrow<string>('FIREBASE_PROJECT_ID');
  const clientEmail = configService.getOrThrow<string>('FIREBASE_CLIENT_EMAIL');
  const privateKey = configService
    .getOrThrow<string>('FIREBASE_PRIVATE_KEY')
    ?.replace(/\\n/g, '\n');

  return { projectId, clientEmail, privateKey };
}
