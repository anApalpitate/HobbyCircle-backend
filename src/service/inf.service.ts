import { Provide } from '@midwayjs/core';
import { Inf } from '../entity/inf';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity'; // 导入 User 实体
import { Circle } from '../entity/circle.entity';
import { Comment } from '../entity/comment.entity';

@Provide()
export class InfService {
  @InjectEntityModel(Inf)
  private infRepository: Repository<Inf>;

  @InjectEntityModel(User)
  private userRepository: Repository<User>;

  async fetchInfs(userID: number): Promise<Inf[]> {
    try {
      return await this.infRepository.find({
        where: { receiver: { id: userID } },
      });
    } catch (error) {
      console.error('获取通知失败:', error);
      throw new Error('获取通知失败');
    }
  }

  async deleteInf(infID: number): Promise<void> {
    try {
      const result = await this.infRepository.delete(infID);
      if (result.affected === 0) {
        throw new Error('通知未找到');
      }
    } catch (error) {
      console.error('删除通知失败:', error);
      throw new Error('删除通知失败');
    }
  }

  async clearAllInf(userID: number): Promise<void> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userID } });
      if (!user) {
        throw new Error('用户未找到');
      }

      const result = await this.infRepository.delete({ receiver: user });
      if (result.affected === 0) {
        throw new Error('未找到要清空的通知');
      }
    } catch (error) {
      console.error('清空通知失败:', error);
      throw new Error('清空通知失败');
    }
  }
  async createCommentInf(comment: Comment): Promise<void> {
    try {
      const newInf = new Inf();
      newInf.receiver = comment.post.author;
      newInf.content = `在兴趣圈: ${comment.post.circle.name} 中, ${comment.author.username} 评论了你标题为'${comment.post.title}'帖子: ${comment.content}`;
      this.infRepository.save(newInf);
    } catch (error) {
      console.error('创建通知失败:', error);
      throw new Error('创建通知失败');
    }
  }
  async createCircleInf(circle: Circle): Promise<void> {
    try {
      const newInf = new Inf();
      newInf.receiver = circle.creator;
      newInf.content = `你创建了兴趣圈: ${circle.name}`;
      this.infRepository.save(newInf);
    } catch (error) {
      console.error('创建通知失败:', error);
      throw new Error('创建通知失败');
    }
  }
}
