import { NotificationEntity } from 'src/modules/notification/entities/notification.entity';
import { TopicEntity } from 'src/modules/topic/entities/topic.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum DeviceType {
  ANDROID = 'android',
  IOS = 'ios',
  WEB = 'web',
}

@Entity({ name: 'tokens' })
export class TokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'text', unique: true })
  token: string;

  @ManyToMany(() => NotificationEntity, (notification) => notification.tokens, {
    onDelete: 'CASCADE',
  })
  notifications: NotificationEntity[];
  @ManyToMany(() => TopicEntity, (topic) => topic.tokens, {
    onDelete: 'CASCADE',
  })
  topics: TopicEntity[];

  @Column({
    type: 'enum',
    enum: DeviceType,
    default: DeviceType.WEB,
    name: 'device_type',
  })
  device_type: DeviceType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
