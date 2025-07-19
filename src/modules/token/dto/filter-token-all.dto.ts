import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { DeviceType } from '../entities/token.entity';

export class FilterTokenAllDto {
  @IsOptional()
  @IsString()
  @IsUUID()
  user_id?: string;

  @IsOptional()
  @IsEnum(DeviceType)
  device_type: DeviceType;
}
