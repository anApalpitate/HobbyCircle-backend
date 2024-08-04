import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity'; // 确保正确引入 User 实体
import { Image } from './image.entity'; // 确保正确引入 Image 实体
import { EntityModel } from '@midwayjs/orm';
import { _Post } from './post.entity';

@EntityModel('circle')
export class Circle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Image, { nullable: true })
  @JoinColumn({ name: 'cover_image_id' })
  cover: Image;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  foundTime: Date;

  @OneToMany(() => _Post, post => post.circle)
  posts: _Post[];
}
