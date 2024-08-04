import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as crossDomain from '@midwayjs/cross-domain';
import * as orm from '@midwayjs/typeorm';
import * as upload from '@midwayjs/upload';
import { DefaultErrorFilter } from './filter/default.filter';
import { NotFoundFilter } from './filter/notfound.filter';
import { GlobalErrorFilter } from './filter/global.filter';

import { join } from 'path';

@Configuration({
  imports: [
    koa,
    crossDomain,
    orm, //typeorm数据库
    upload,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    //添加中间件

    //添加过滤器
    this.app.useFilter([GlobalErrorFilter, NotFoundFilter, DefaultErrorFilter]);
    //数据库初始化
  }
}
