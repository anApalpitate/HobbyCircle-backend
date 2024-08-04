import { InjectEntityModel } from '@midwayjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { BusinessError } from '../exception/business.error';
import { Provide } from '@midwayjs/core';
import jwt from 'jsonwebtoken';

const JWT_SECRET = '114514';

@Provide()
export class AuthService {
  @InjectEntityModel(User)
  private userRepository: Repository<User>;

  async register(
    username: string,
    password: string
  ): Promise<{ token: string; user: User }> {
    const existingUser = await this.findUserByUsername(username);
    if (existingUser) {
      console.log('用户名已存在');
      throw new BusinessError('用户名已存在');
    } else if (password.length < 6) {
      console.log('密码过短');
      throw new BusinessError('密码过短');
    } else if (password.length > 16) {
      console.log('密码过长');
      throw new BusinessError('密码过长');
    } else if (username.length == 0) {
      console.log('用户名为空');
      throw new BusinessError('用户名为空');
    }

    const user = new User();
    user.username = username;
    user.password = password;
    await this.userRepository.save(user);

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    return { token, user };
  }

  async login(
    username: string,
    password: string
  ): Promise<{ token: string; user: User }> {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new BusinessError('用户不存在');
    } else if (password.length == 0) {
      throw new BusinessError('密码为空');
    } else if (username.length == 0) {
      throw new BusinessError('用户名为空');
    } else if (user.password !== password) {
      throw new BusinessError('密码错误');
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    return { token, user };
  }

  async findUserByUsername(username: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOneBy({ username });
      return user;
    } catch (err) {
      return null;
    }
  }
}
