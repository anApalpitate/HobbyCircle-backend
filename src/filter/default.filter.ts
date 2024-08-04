import { Catch } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Catch()
export class DefaultErrorFilter {
  async catch(err: Error, ctx: Context) {
    ctx.status = 500;
    ctx.body = {
      message: '捕获到错误: ' + err.message,
    };
  }
}
