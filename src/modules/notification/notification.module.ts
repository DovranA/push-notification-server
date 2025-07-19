import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './entities/notification.entity';
import { TokenService } from '../token/token.service';
import { TokenEntity } from '../token/entities/token.entity';
import { TopicEntity } from '../topic/entities/topic.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationEntity, TokenEntity, TopicEntity]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, TokenService],
})
export class NotificationModule {}
