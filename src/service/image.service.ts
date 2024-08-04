import { Provide } from '@midwayjs/core';
import { Repository } from 'typeorm';
import { Image } from '../entity/image.entity';
import { InjectEntityModel } from '@midwayjs/typeorm';

import * as path from 'path';
import * as fs from 'fs';
@Provide()
export class ImageService {
  @InjectEntityModel(Image)
  private imageRepository: Repository<Image>;
  private imageDir = path.join(__dirname, '../image'); // 图片文件存储目录

  async uploadImage(fileTempPath: string, fileName: string): Promise<Image> {
    try {
      // 定义文件保存路径
      const filePath = path.join(this.imageDir, fileName); // 使用相对路径

      if (!fs.existsSync(this.imageDir)) {
        fs.mkdirSync(this.imageDir, { recursive: true });
      }
      fs.copyFileSync(fileTempPath, filePath);

      // 创建图像对象并保存路径
      const image = new Image();
      image.fileName = fileName;
      image.filePath = filePath; // 存储相对路径
      await this.imageRepository.save(image);

      return image;
    } catch (error) {
      throw new Error('图片上传失败: ' + error.message);
    }
  }

  async getImageData(id: number): Promise<{ data: string; fileName: string }> {
    try {
      const image = await this.imageRepository.findOne({ where: { id } });
      if (!image) {
        throw new Error('图片未找到');
      }

      const filePath = path.join(this.imageDir, image.fileName);
      if (!fs.existsSync(filePath)) {
        throw new Error('图片文件不存在');
      }
      const imageData = fs.readFileSync(filePath); // 读取图片文件
      return {
        data: imageData.toString('base64'), // 将图片数据编码为 base64 字符串
        fileName: image.fileName,
      };
    } catch (error) {
      throw new Error('获取图片数据失败: ' + error.message);
    }
  }
}
