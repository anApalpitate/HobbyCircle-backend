import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

describe('test/controller/home.test.ts', () => {
  it('should GET /', async () => {
    // create app
    const app = await createApp<Framework>();

    // make request
    const result = await createHttpRequest(app).get('/');
    expect(true).toBe(true);
    // close app
    await close(app);
  });
});
