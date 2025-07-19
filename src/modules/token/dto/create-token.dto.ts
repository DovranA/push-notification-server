import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { DeviceType } from '../entities/token.entity';

export class CreateTokenDto {
  @ApiProperty({
    type: 'string',
    example: '4bc8ea00-2235-49d4-b548-9ba38c99e2c7',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  user_id: string;

  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty({ type: String, enum: DeviceType, default: DeviceType.WEB })
  @IsString()
  @IsEnum(DeviceType)
  device_type: DeviceType;
}
