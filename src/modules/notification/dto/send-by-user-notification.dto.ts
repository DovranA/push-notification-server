import { ApiProperty } from '@nestjs/swagger';
import {
  IsObject,
  IsOptional,
  IsNotEmpty,
  IsString,
  IsUUID,
  IsUrl,
} from 'class-validator';
import type { Notification } from 'firebase-admin/lib/messaging/messaging-api';

export class SendByUserNotificationDto implements Notification {
  @ApiProperty({ nullable: true })
  @IsObject()
  @IsOptional()
  data?: { [key: string]: string } | undefined;

  @ApiProperty({
    type: 'string',
    example: '4bc8ea00-2235-49d4-b548-9ba38c99e2c7',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  user_id: string;

  @ApiProperty({
    example: 'notification body',
  })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsUrl()
  @IsOptional()
  image_url?: string | undefined;

  @ApiProperty({ example: 'Tmbiz Title' })
  @IsString()
  @IsNotEmpty()
  title: string;
}
