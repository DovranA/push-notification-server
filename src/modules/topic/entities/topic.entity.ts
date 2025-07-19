import { NotificationEntity } from 'src/modules/notification/entities/notification.entity';
import { TokenEntity } from 'src/modules/token/entities/token.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'topics' })
export class TopicEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;
  @Column({ type: 'boolean' })
  auto_subscribe: boolean;

  @ManyToMany(() => NotificationEntity, (notification) => notification.topics)
  @JoinTable({
    name: 'topic_notification',
    joinColumn: { name: 'topic_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'notification_id', referencedColumnName: 'id' },
  })
  notifications: NotificationEntity[];
  @ManyToMany(() => TokenEntity, (token) => token.topics)
  @JoinTable({
    name: 'token_topic',
    joinColumn: { name: 'topic_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'token_id', referencedColumnName: 'id' },
  })
  tokens: TokenEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
