import { NotificationEntity } from 'src/modules/notification/entities/notification.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tokens' })
export class TokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'text', unique: true })
  token: string;

  @ManyToMany(() => NotificationEntity, (notification) => notification.tokens)
  notifications: NotificationEntity[];

  @Column({ type: 'varchar', length: 20, default: 'web' })
  device_type: 'android' | 'ios' | 'web';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
