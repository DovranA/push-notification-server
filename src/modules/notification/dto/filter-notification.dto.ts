import { IsEnum, IsOptional, IsString } from 'class-validator';
import { NotificationStatus } from '../entities/notification.entity';

export class FilterNotificationAllDto {
  @IsOptional()
  @IsString()
  @IsEnum(NotificationStatus)
  status: NotificationStatus;
}
