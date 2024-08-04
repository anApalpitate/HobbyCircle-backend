// src/filter/global.filter.ts
import { Catch } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { BusinessError } from '../exception/business.error';

@Catch()
export class GlobalErrorFilter {
  async catch(err: Error, ctx: Context) {
    if (err instanceof BusinessError) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: 'BusinessError:' + err.message,
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: err.message,
      };
    }
  }
}
