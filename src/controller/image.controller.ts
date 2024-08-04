// src/controller/image.controller.ts
import {
  Controller,
  Files,
  Fields,
  Inject,
  Post,
  Provide,
  Get,
  Param,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ImageService } from '../service/image.service';

@Provide()
@Controller('/image')
export class ImageController {
  @Inject()
  ctx: Context;

  @Inject()
  private imageService: ImageService;

  @Post('/upload')
  async upload(@Files() files, @Fields() fields) {
    if (!files || !files.length) {
      this.ctx.status = 400;
      this.ctx.body = { message: '无文件上传' };
      return;
    }

    const imageIds: number[] = []; // 初始化一个数组用于存储图片 ID

    for (const file of files) {
      try {
        // 传递文件数据和文件名
        const image = await this.imageService.uploadImage(
          file.data,
          file.filename
        );
        imageIds.push(image.id); // 将上传图片的 ID 添加到数组中
      } catch (error) {
        console.error(error);
        this.ctx.status = 500;
        this.ctx.body = { message: '图片上传失败' };
        return;
      }
    }

    this.ctx.body = { imageIds }; // 返回包含图片 ID 的数组
    return imageIds; // 返回图片 ID 数组
  }

  @Get('/:id')
  async getImage(@Param('id') id: number) {
    try {
      const imageData = await this.imageService.getImageData(Number(id));
      this.ctx.status = 200;
      this.ctx.body = imageData;
    } catch (error) {
      this.ctx.status = 500;
      this.ctx.body = { message: error.message };
    }
  }
}
