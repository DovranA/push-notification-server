import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SendNotification } from './dto/send-notification.dto';
import { SendByUserNotificationDto } from './dto/send-by-user-notification.dto';
import { FilterNotificationAllDto } from './dto/filter-notification.dto';
import { ApiQuery } from '@nestjs/swagger';
import { NotificationStatus } from './entities/notification.entity';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @ApiQuery({ name: 'status', enum: NotificationStatus, required: false })
  findAll(@Query() filter: FilterNotificationAllDto) {
    return this.notificationService.findAll(filter);
  }

  @Post('multicast')
  public sendByUserNotification(@Body() dto: SendByUserNotificationDto) {
    return this.notificationService.sendByUserNotification(dto);
  }
  @Post()
  public sendNotification(@Body() dto: SendNotification) {
    return this.notificationService.sendNotification(dto);
  }
}
