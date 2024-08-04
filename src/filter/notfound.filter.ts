import { Catch, httpError, MidwayHttpError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Catch(httpError.NotFoundError)
export class NotFoundFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    // 404 错误会到这里
    ctx.status = 404;
    ctx.body = {
      success: false,
      message: '资源未找到',
    };
  }
}
