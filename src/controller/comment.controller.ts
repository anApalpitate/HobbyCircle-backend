// src/controller/PostController.ts
import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entity/comment.entity';
import { Body, Controller, Get, Inject, Param, Post } from '@midwayjs/core';
import { InfService } from '../service/inf.service';
import { _Post } from '../entity/post.entity';
import { User } from '../entity/user.entity';

@Provide()
@Controller('/comment')
export class CommentController {
  @InjectEntityModel(Comment)
  commentRepository: Repository<Comment>;

  @InjectEntityModel(_Post)
  postRepository: Repository<_Post>;

  @InjectEntityModel(User)
  userRepository: Repository<User>;

  @Inject()
  InfService: InfService;

  @Post('/create')
  async create(
    @Body() data: { content: string; postID: number; authorID: number }
  ) {
    try {
      const content = data.content;
      const postId = data.postID;
      const userId = data.authorID;
      const comment = new Comment();
      comment.content = content;
      comment.post = await this.postRepository.findOne({
        where: { id: postId },
      });
      const author = await this.userRepository.findOne({
        where: { id: userId },
      });
      author.activity += 2;
      await this.userRepository.save(author);
      comment.author = author;
      this.commentRepository.save(comment);
      this.InfService.createCommentInf(comment);
    } catch (err) {
      console.error(err);
    }
  }

  @Get('/fetchComments/:postId')
  async fetchComments(@Param('postId') postId: number): Promise<Comment[]> {
    try {
      const comments = await this.commentRepository.find({
        where: { post: { id: postId } },
      });
      return comments;
    } catch (err) {
      console.error(err);
    }
  }
  @Get('/delete/:id')
  async deleteComment(@Param('id') commentId: number) {
    try {
      const result = await this.commentRepository.delete(commentId);
      if (result.affected === 0) {
        return {
          success: false,
          message: '未找到该评论',
        };
      }
      return {
        success: true,
        message: '评论删除成功',
      };
    } catch (err) {
      console.error(err);
      return {
        success: false,
        message: '评论删除失败',
      };
    }
  }
}
