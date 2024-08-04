// src/controller/post.controller.ts
import {
  Controller,
  Files,
  Fields,
  Post,
  Provide,
  Inject,
  Param,
  Get,
} from '@midwayjs/core';
import { _Post } from '../entity/post.entity';
import { Context } from '@midwayjs/koa';
import { ImageService } from '../service/image.service';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Circle } from '../entity/circle.entity';
import { User } from '../entity/user.entity';

@Provide()
@Controller('/post')
export class PostController {
  @Inject()
  ctx: Context;

  @InjectEntityModel(_Post)
  private postRepository: Repository<_Post>;

  @InjectEntityModel(Circle)
  private circleRepository: Repository<Circle>;

  @InjectEntityModel(User)
  private userRepository: Repository<User>;

  @Inject()
  private imageService: ImageService;

  @Post('/create')
  async create(@Files() files: any, @Fields() fields: any) {
    {
      try {
        const title = fields.title;
        const content = fields.content;
        const userID = fields.userID;
        const CircleID = fields.CircleID;

        const imageIds: { id: number }[] = [];
        for (const file of files) {
          const image = await this.imageService.uploadImage(
            file.data,
            file.filename
          );
          imageIds.push({ id: image.id }); // 修改为包含 id 属性的对象
        }
        const post = new _Post();
        post.title = title;
        post.content = content;
        const author = await this.userRepository.findOne({
          where: { id: userID },
        });
        post.author = author;
        author.activity += 3;
        await this.userRepository.save(author);

        post.circle = await this.circleRepository.findOne({
          where: { id: CircleID },
        });
        post.images = imageIds;
        await this.postRepository.save(post);
      } catch (err) {
        console.error(err);
        return {
          success: false,
          message: '创建失败',
        };
      }
    }
  }
  @Get('/getPostsByCircleId/:circleId')
  async getPostsByCircleId(@Param('circleId') circleId: number) {
    try {
      const posts = await this.postRepository.find({
        where: { circle: { id: circleId } },
      });

      return {
        success: true,
        data: posts,
      };
    } catch (err) {
      console.error(err);
      return {
        success: false,
        message: 'Failed to fetch posts by circle ID',
      };
    }
  }

  @Get('/getPostById/:id')
  async getPostById(@Param('id') id: number) {
    try {
      const post = await this.postRepository.findOne({
        where: { id },
        relations: ['author', 'circle', 'comments', 'images'],
      });

      if (!post) {
        return {
          success: false,
          message: 'Post not found',
        };
      }

      return {
        success: true,
        data: post,
      };
    } catch (err) {
      console.error(err);
      return {
        success: false,
        message: 'Failed to fetch post by ID',
      };
    }
  }
  @Get('/delete/:id')
  async deletePost(@Param('id') id: number) {
    try {
      const result = await this.postRepository.delete(id);
      if (result.affected === 0) {
        return {
          success: false,
          message: 'Post not found',
        };
      }
      return {
        success: true,
        message: 'Post deleted successfully',
      };
    } catch (err) {
      console.error(err);
      return {
        success: false,
        message: 'Failed to delete post',
      };
    }
  }
}
