import {
  Controller,
  Post,
  Body,
  Inject,
  Get,
  Param,
} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Context } from '@midwayjs/koa';
import { Repository } from 'typeorm';
import { Circle } from '../entity/circle.entity';
import { User } from '../entity/user.entity';
import { Image } from '../entity/image.entity';
import { InfService } from '../service/inf.service';
@Controller('/circle')
export class CircleController {
  @Inject()
  ctx: Context;

  @InjectEntityModel(Circle)
  circleRepository: Repository<Circle>;
  @InjectEntityModel(Image)
  imageRepository: Repository<Image>;

  @InjectEntityModel(User)
  userRepository: Repository<User>;

  @Inject()
  InfService: InfService;

  @Get('/getCircles')
  async getCircles() {
    try {
      // 从数据库中获取所有 Circle 实体
      const circles = await this.circleRepository.find({
        relations: ['creator', 'cover'], // 根据需要加载关联关系
      });
      this.ctx.status = 200;
      this.ctx.body = circles;
    } catch (error) {
      console.error('获取兴趣圈失败', error);
      this.ctx.status = 500;
      this.ctx.body = { message: '获取兴趣圈失败' };
    }
  }
  @Post('/create')
  async create(@Body() data: any) {
    const name = data.name;
    const description = data.description;
    const imageID = data.imageID;
    const creatorID = data.creatorID;
    const foundTime = data.foundTime;
    try {
      const creatorUser = await this.userRepository.findOne({
        where: { id: creatorID },
      });
      if (!creatorUser) {
        this.ctx.status = 400;
        this.ctx.body = { message: '未找到创建者' };
        return;
      }
      creatorUser.activity += 5;
      await this.userRepository.save(creatorUser);
      const circle = new Circle();
      circle.name = name;
      circle.description = description;
      circle.creator = creatorUser;
      circle.cover = await this.imageRepository.findOne({
        where: { id: imageID },
      });
      circle.foundTime = foundTime;
      this.InfService.createCircleInf(circle);
      const savedCircle = await this.circleRepository.save(circle);
      this.ctx.status = 201;
      this.ctx.body = savedCircle;
    } catch (error) {
      console.error('兴趣圈创建错误', error);
      this.ctx.status = 500;
      this.ctx.body = { message: '兴趣圈创建失败' };
    }
  }
  @Get('/getByID/:id')
  async getByID(@Param('id') circleID: number): Promise<Circle> {
    try {
      const circle = await this.circleRepository.findOne({
        where: { id: circleID },
      });
      if (!circle) {
        throw new Error('未找到对应的兴趣圈');
      }
      return circle;
    } catch (error) {
      console.error('依据ID获取兴趣圈失败:', error);
      throw new Error('依据ID获取兴趣圈失败');
    }
  }
  @Get('/delete/:id')
  async delete(@Param('id') id: number) {
    try {
      const result = await this.circleRepository.delete(id);
      if (result.affected === 0) {
        this.ctx.status = 404;
        this.ctx.body = { message: '未找到要删除的兴趣圈' };
        return;
      }

      this.ctx.status = 200;
      this.ctx.body = { message: '兴趣圈已删除' };
    } catch (error) {
      console.error('删除兴趣圈失败', error);
      this.ctx.status = 500;
      this.ctx.body = { message: '删除兴趣圈失败' };
    }
  }
}
