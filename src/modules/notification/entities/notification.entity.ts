import { TokenEntity } from 'src/modules/tokens/entities/token.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'notifications' })
export class NotificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'uuid', nullable: true })
  token_id: string;

  @ManyToOne(() => TokenEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'token_id' })
  token: TokenEntity;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  body: string;

  @Column({ type: 'jsonb' })
  data: string;

  @Column({ enum: ['pending', 'send', 'failed'] })
  status: 'pending' | 'send' | 'failed';

  @UpdateDateColumn()
  send_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
