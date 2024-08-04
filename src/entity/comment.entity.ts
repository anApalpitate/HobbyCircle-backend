import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { _Post } from './post.entity';
import { EntityModel } from '@midwayjs/orm';

@EntityModel('comment')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @ManyToOne(() => _Post, post => post.comments)
  @JoinColumn({ name: 'post_id' })
  post: _Post;
}
