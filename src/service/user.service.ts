// backend\src\service\user.service.ts
import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userRepository: Repository<User>;

  async createUser(username: string, password: string): Promise<User> {
    const user = new User();
    user.username = username;
    user.password = password;

    return await this.userRepository.save(user);
  }

  async findUser(username: string): Promise<User | null> {
    try {
      return await this.userRepository.findOne({ where: { username } });
    } catch (error) {
      return null;
    }
  }

  async listUsers(): Promise<User[]> {
    try {
      const res = await this.userRepository.find();
      return res;
    } catch (error) {
      console.error(error);
    }
  }
  async addactivity(userID: number, increment: number): Promise<void> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userID } });
      user.activity += increment;
      await this.userRepository.save(user);
    } catch (error) {
      console.error(error);
    }
  }
  async getActivity(userID: number): Promise<number> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userID } });
      return user.activity;
    } catch (error) {
      console.error(error);
    }
  }
}
