import { MidwayConfig } from '@midwayjs/core';
import { uploadWhiteList } from '@midwayjs/upload';
import { tmpdir } from 'os';
import { join } from 'path';
import { User } from '../entity/user.entity';
import { Circle } from '../entity/circle.entity';
import { Image } from '../entity/image.entity';
import { _Post } from '../entity/post.entity';
import { Comment } from '../entity/comment.entity';
import * as path from 'path';
import { Inf } from '../entity/inf';
export default {
  keys: '1721889468687_7160',
  koa: {
    port: 7001,
    bodyParser: {
      multipart: true,
      formidable: {
        uploadDir: path.join(__dirname, '../image'), // 上传文件存储目录
        keepExtensions: true, // 保留文件扩展名
      },
    },
  },
  cors: {
    origin: '*', // 或者指定具体的域名
    allowMethods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        host: 'rm-bp1sk338m8q0cxdj8ho.mysql.rds.aliyuncs.com',
        port: 3306,
        username: 'Apalpitate',
        password: '660123lczsS',
        database: 'hobby_circle',
        synchronize: true,
        logging: false,
        entities: [User, Circle, Image, _Post, Comment, Inf],
        driver: require('mysql2'),
      },
    },
  },
  upload: {
    mode: 'file',
    fileSize: '20mb',
    whitelist: uploadWhiteList.filter(ext => ext !== '.pdf'),
    tmpdir: join(tmpdir(), 'midway-upload-files'),
    cleanTimeout: 5 * 60 * 1000,
    base64: false,
    match: /\/(image|post|comment|circle|user|inf)\//,
  },
  jwt: {
    secret: 'your-secret-key',
    expiresIn: '2h',
  },
  jsonp: {
    callback: 'jsonp',
    limit: 512,
  },
} as MidwayConfig;
