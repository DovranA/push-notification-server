import { TokenEntity } from 'src/modules/token/entities/token.entity';
import { TopicEntity } from 'src/modules/topic/entities/topic.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum NotificationStatus {
  PENDING = 'pending',
  SEND = 'send',
  FAILED = 'failed',
}
@Entity({ name: 'notifications' })
export class NotificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @ManyToMany(() => TokenEntity, (token) => token.notifications)
  @JoinTable({
    name: 'token_notification',
    joinColumn: { name: 'notification_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'token_id', referencedColumnName: 'id' },
  })
  tokens: TokenEntity[];

  @ManyToMany(() => TopicEntity, (topic) => topic.notifications)
  topics: TopicEntity[];

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  body: string;

  @Column({ type: 'jsonb', nullable: true })
  data?: string;

  @Column({ enum: NotificationStatus })
  status: NotificationStatus;

  @Column({ type: 'text', nullable: true })
  image_url?: string;

  @UpdateDateColumn()
  send_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
