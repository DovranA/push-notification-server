import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicEntity } from './entities/topic.entity';
import { NotificationEntity } from '../notification/entities/notification.entity';
import { TokenService } from '../token/token.service';
import { TokenEntity } from '../token/entities/token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TopicEntity, NotificationEntity, TokenEntity]),
  ],
  controllers: [TopicController],
  providers: [TopicService, TokenService],
})
export class TopicModule {}
