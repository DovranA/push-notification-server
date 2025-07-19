import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { TopicService } from './topic.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { ApiQuery } from '@nestjs/swagger';
import { FilterTopicAllDto } from './dto/filter-topic-all.dto';
import { SubscribeByTokenDto } from './dto/subscribe-by-token.dto';

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  @ApiQuery({
    name: 'auto_subscribe',
    required: false,
    type: Boolean,
    description: 'auth_subscribe',
  })
  public async findAll(@Query() filter: FilterTopicAllDto) {
    return this.topicService.findAll(filter);
  }

  @Post()
  public async create(@Body() dto: CreateTopicDto) {
    return this.topicService.create(dto);
  }

  @Post('subscribe/:topic_id')
  public async subscribeToTopic(
    @Body() dto: SubscribeByTokenDto,
    @Param('topic_id') topic_id: string,
  ) {
    if (!topic_id) {
      throw new BadRequestException("topic_id didn't enter");
    }
    return await this.topicService.subscribeToTopic(dto, topic_id);
  }
  @Delete('unsubscribe/:topic_id')
  public async unsubscribeFromTopic(
    @Body() dto: SubscribeByTokenDto,
    @Param('topic_id') topic_id: string,
  ) {
    if (!topic_id) {
      throw new BadRequestException("topic_id didn't enter");
    }
    return await this.topicService.unsubscribeFromTopic(dto, topic_id);
  }
}
