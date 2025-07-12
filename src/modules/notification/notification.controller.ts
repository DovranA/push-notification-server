import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import {
  SendByUserNotificationDto,
  SendNotification,
} from './dto/send-notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('multicast')
  public sendByUserNotification(@Body() dto: SendByUserNotificationDto) {
    return this.notificationService.sendByUserNotification(dto);
  }
  @Post()
  public sendNotification(@Body() dto: SendNotification) {
    return this.notificationService.sendNotification(dto);
  }
}
