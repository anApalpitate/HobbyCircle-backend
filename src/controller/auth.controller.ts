//src/controller/auth.controller.ts
import { Controller, Post, Body, Provide, Inject } from '@midwayjs/decorator';
import { AuthService } from '../service/auth.service';

@Provide()
@Controller('/auth')
export class AuthController {
  @Inject()
  private authService: AuthService;

  @Post('/register')
  async register(@Body() body: { username: string; password: string }) {
    try {
      const result = await this.authService.register(
        body.username,
        body.password
      );
      return { success: true, data: result };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  @Post('/login')
  async login(@Body() body: { username: string; password: string }) {
    try {
      const result = await this.authService.login(body.username, body.password);
      return { success: true, data: result };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }
}
