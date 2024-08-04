import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { _Post } from './post.entity';
import { Circle } from './circle.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  activity: number;

  @OneToMany(() => _Post, post => post.author)
  posts: _Post[];

  @OneToMany(() => Circle, circle => circle.creator)
  circles: Circle[];
}
