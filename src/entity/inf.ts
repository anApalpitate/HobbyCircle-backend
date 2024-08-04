import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
  Entity,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('inf')
export class Inf {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  content: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'receiver_id' })
  receiver: User;

  @UpdateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
