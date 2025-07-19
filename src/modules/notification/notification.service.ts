import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  NotificationEntity,
  NotificationStatus,
} from './entities/notification.entity';
import { Repository } from 'typeorm';
import { FCMService } from '../libs/fcm/fcm.service';
import { SendNotification } from './dto/send-notification.dto';
import { TokenService } from '../token/token.service';
import { SendByUserNotificationDto } from './dto/send-by-user-notification.dto';
import { FilterNotificationAllDto } from './dto/filter-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
    private readonly fcmService: FCMService,
    private tokenService: TokenService,
  ) {}

  public async findAll(filter: FilterNotificationAllDto) {
    return this.notificationRepository.find({ where: filter });
  }
  public async sendNotification(dto: SendNotification) {
    const { token, body, title, image_url } = dto;
    return await this.fcmService.sendNotification(token, {
      notification: { body, title, imageUrl: image_url },
    });
  }
  public async sendByUserNotification(dto: SendByUserNotificationDto) {
    const { body, data, title, user_id, image_url } = dto;
    const userTokens = await this.tokenService.userToken(user_id);
    const notification = this.notificationRepository.create({
      body,
      data: data ? JSON.stringify(data) : undefined,
      status: NotificationStatus.PENDING,
      title,
      user_id,
      image_url,
      tokens: userTokens,
    });

    const savedNotification =
      await this.notificationRepository.save(notification);
    if (savedNotification) {
      const tokens =
        savedNotification?.tokens?.map((token) => token.token) ?? [];
      try {
        const res = await this.fcmService.sendMulticastNotification(tokens, {
          notification: { body, imageUrl: image_url, title },
        });
        if (res) {
          if (res.successCount) {
            await this.notificationRepository.update(
              { id: savedNotification.id },
              { status: NotificationStatus.SEND },
            );
            return res;
          } else {
            await this.notificationRepository.update(
              { id: savedNotification.id },
              { status: NotificationStatus.FAILED },
            );
            throw new BadRequestException('FCM token is not registered');
          }
        }
      } catch (error) {
        if (error.code === 'messaging/invalid-argument') {
          throw new BadRequestException('Invalid FCM token or payload');
        }

        if (error.code === 'messaging/registration-token-not-registered') {
          throw new BadRequestException('FCM token is not registered');
        }

        if (error.code === 'messaging/server-unavailable') {
          throw new ServiceUnavailableException('FCM service is unavailable');
        }

        throw new InternalServerErrorException('Failed to send notification');
      }
    }
  }
}
