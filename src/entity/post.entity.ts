import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Circle } from './circle.entity';
import { Comment } from './comment.entity';
import { JoinColumn } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';

@EntityModel('post')
export class _Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @ManyToOne(() => Circle, { eager: true })
  @JoinColumn({ name: 'circle_id' })
  circle: Circle;

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];

  @Column('simple-json', { nullable: true })
  images: { id: number }[];
}
