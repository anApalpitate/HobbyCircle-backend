import { Controller, Get, Param, Provide, Inject } from '@midwayjs/core';
import { InfService } from '../service/inf.service';

@Provide()
@Controller('/inf')
export class InfController {
  @Inject()
  infService: InfService;

  @Get('/fetchInfs/:userID')
  async fetchInfs(@Param('userID') userID: number) {
    return this.infService.fetchInfs(userID) || [];
  }

  @Get('/delete/:infID')
  async deleteInf(@Param('infID') infID: number) {
    await this.infService.deleteInf(infID);
    return { message: '通知已删除' };
  }

  @Get('/clearAll/:userID')
  async clearAllInf(@Param('userID') userID: number) {
    await this.infService.clearAllInf(userID);
    return { message: '所有通知已清空' };
  }
}
