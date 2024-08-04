// backend\src\controller\user.controller.ts
import {
  Controller,
  Post,
  Body,
  Provide,
  Get,
  Param,
  Inject,
} from '@midwayjs/core';
import { UserService } from '../service/user.service';
import { User } from '../entity/user.entity';

@Provide()
@Controller('/user')
export class UserController {
  @Inject()
  private userService: UserService;

  @Post('/create')
  async createUser(@Body() userData: { username: string; password: string }) {
    return await this.userService.createUser(
      userData.username,
      userData.password
    );
  }

  @Get('/find/:username')
  async findUser(
    @Param() username: string
  ): Promise<User | { message: string }> {
    const user = await this.userService.findUser(username);
    if (user) {
      return user;
    }
    return { message: '用户不存在' };
  }

  @Post('/fetchUsers')
  async fetchUsers(): Promise<User[]> {
    const result = await this.userService.listUsers();
    return result || [];
  }

  @Post('/addActivity')
  async addactivity(
    @Body() body: { userid: number; increment: number }
  ): Promise<void> {
    this.userService.addactivity(body.userid, body.increment);
  }
  @Get('/getActivity/:userId')
  async getActivity(@Param() userId: number): Promise<number> {
    return await this.userService.getActivity(userId);
  }
}
