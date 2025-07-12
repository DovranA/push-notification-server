import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
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

export class SendNotification implements Notification {
  @ApiProperty({ nullable: true })
  @IsObject()
  @IsOptional()
  data?: { [key: string]: string } | undefined;

  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  token: string;

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
