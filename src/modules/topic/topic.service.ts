import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TopicEntity } from './entities/topic.entity';
import { Repository } from 'typeorm';
import { CreateTopicDto } from './dto/create-topic.dto';
import { FilterTopicAllDto } from './dto/filter-topic-all.dto';
import { FCMService } from '../libs/fcm/fcm.service';
import { TokenService } from '../token/token.service';
import { SubscribeByTokenDto } from './dto/subscribe-by-token.dto';
import { SubscribeByUserDto } from './dto/subscribe-by-user.dto';

@Injectable()
export class TopicService {
  public constructor(
    @InjectRepository(TopicEntity)
    private readonly topicRepository: Repository<TopicEntity>,
    private readonly fcmService: FCMService,
    private tokenService: TokenService,
  ) {}
  public async findAll(filter: FilterTopicAllDto) {
    const { auto_subscribe } = filter;
    return await this.topicRepository.find({
      where: { auto_subscribe },
      order: { created_at: 'ASC' },
    });
  }
  public async create(dto: CreateTopicDto) {
    const topic = this.topicRepository.create(dto);
    try {
      return await this.topicRepository.save(topic);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Topic already exists');
      }
      throw new BadRequestException('error');
    }
  }
  public async subscribeToTopic(dto: SubscribeByTokenDto, topic_id: string) {
    const { token, user_id } = dto;
    const topic = await this.topicRepository.findOne({
      where: { id: topic_id },
    });
    if (!topic) {
      throw new NotFoundException('Topic not found');
    }
    if (user_id) {
      const tokenList = await this.tokenService.userToken(user_id);
      if (!tokenList.length) {
        throw new NotFoundException('User not found');
      }
      const tokens = tokenList.map((token) => token.token);
      try {
        const response = await this.fcmService.subscribeTopic(
          tokens,
          topic.name,
        );
        if (response.errors.length === 0) {
          return { success: true };
        } else {
          throw new ServiceUnavailableException('Failed to send notification');
        }
      } catch (error) {
        if (error.code) {
          throw new BadRequestException('topic id must be uuid');
        }
        throw error;
      }
    } else if (token) {
      try {
        const response = await this.fcmService.subscribeTopic(
          token,
          topic.name,
        );
        if (response.errors.length === 0) {
          return { success: true };
        } else {
          throw new ServiceUnavailableException('Failed to send notification');
        }
      } catch (error) {
        if (error.code) {
          throw new BadRequestException('topic id must be uuid');
        }
        throw error;
      }
    }
  }
  public async unsubscribeFromTopic(
    dto: SubscribeByTokenDto,
    topic_id: string,
  ) {
    const { token, user_id } = dto;
    const topic = await this.topicRepository.findOne({
      where: { id: topic_id },
    });
    if (!topic) {
      throw new NotFoundException('Topic not found');
    }
    if (user_id) {
      const tokenList = await this.tokenService.userToken(user_id);
      if (!tokenList.length) {
        throw new NotFoundException('User not found');
      }
      const tokens = tokenList.map((token) => token.token);
      try {
        const response = await this.fcmService.unsubscribeTopic(
          tokens,
          topic.name,
        );
        if (response.errors.length === 0) {
          const newTokens = topic.tokens.filter(
            (token) => !tokens.includes(token.id),
          );
          await this.topicRepository.update(
            { id: topic.id },
            { tokens: newTokens },
          );
          return { success: true };
        } else {
          throw new ServiceUnavailableException('Failed to send notification');
        }
      } catch (error) {
        if (error.code) {
          throw new BadRequestException('topic id must be uuid');
        }
        throw error;
      }
    } else if (token) {
      try {
        const response = await this.fcmService.unsubscribeTopic(
          token,
          topic.name,
        );
        if (response.errors.length === 0) {
          const newTokens = topic.tokens.filter((item) => item.token !== token);
          await this.topicRepository.update(
            { id: topic.id },
            { tokens: newTokens },
          );
          return { success: true };
        } else {
          throw new ServiceUnavailableException('Failed to send notification');
        }
      } catch (error) {
        if (error.code) {
          throw new BadRequestException('topic id must be uuid');
        }
        throw error;
      }
    }
  }

  public async subscribeByUser(
    { user_id }: SubscribeByUserDto,
    topic_id: string,
  ) {
    const tokenList = await this.tokenService.userToken(user_id);
    if (!tokenList || !tokenList.length) {
      throw new NotFoundException('user or token not found');
    }
    try {
      const topic = await this.topicRepository.findOne({
        where: { id: topic_id },
      });
      if (!topic) {
        throw new NotFoundException('Topic not found');
      }
      const tokens = tokenList.map((token) => token.token);
      const response = await this.fcmService.subscribeTopic(tokens, topic.name);
      if (response.errors.length === 0) {
        await this.topicRepository.update(
          { id: topic_id },
          { tokens: tokenList },
        );
        return { success: true };
      } else {
        throw new ServiceUnavailableException('Failed to send notification');
      }
    } catch (error) {
      if (error.code) {
        throw new BadRequestException('topic id must be uuid');
      }
      throw error;
    }
  }
}
