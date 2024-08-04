import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';

@EntityModel('image')
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  fileName: string;

  @Column({ type: 'varchar', length: 255 })
  filePath: string; // 改为存储文件路径
}
