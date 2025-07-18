import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import type { Notification } from 'firebase-admin/lib/messaging/messaging-api';

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
