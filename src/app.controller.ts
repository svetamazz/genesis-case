import { Controller, Get, Post, Query, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/rate')
  getRate(): Promise<number> {
    return this.appService.getRate();
  }

  @Post('/subscribe')
  @HttpCode(200)
  subscribe(@Query() query: any): Promise<any> {
    return this.appService.subscribe(query.email);
  }

  @Get('/subscribers')
  getSubscribers(): Promise<any> {
    return this.appService.getSubscribers();
  }
}
