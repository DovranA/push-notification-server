import { Injectable } from '@nestjs/common';
import { FCMService } from 'src/fcm/fcm.service';

@Injectable()
export class AppService {
  constructor(private readonly fcmService: FCMService) {}
}
