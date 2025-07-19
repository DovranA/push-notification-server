import { IsBooleanString, IsOptional } from 'class-validator';

export class FilterTopicAllDto {
  @IsOptional()
  @IsBooleanString()
  auto_subscribe?: boolean;
}
