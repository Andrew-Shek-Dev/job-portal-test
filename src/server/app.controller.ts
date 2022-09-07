import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  @Get('/')
  @Render('index')
  home() {
    return {};
  }

  @Get('/csr')
  @Render('csr')
  csr(){
    return {}
  }

  @Get('/ssr')
  @Render('ssr')
  ssr(){
    return {}
  }

  @Get('/ssg')
  @Render('ssg')
  ssg(){
    return {}
  }
}
