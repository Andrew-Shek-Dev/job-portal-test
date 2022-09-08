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
  index() {
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

  @Get("/link")
  @Render('link')
  link(){
    return {}
  }

  @Get('/post/:postId')
  @Render('post/[postId]')
  post(){
    return {}
  }

  @Get('/ImperativelyRouting')
  @Render('ImperativelyRouting')
  imperativelyRouting(){
    return {}
  }

  @Get('/ShallowRouting')
  @Render('ShallowRouting')
  shallowRouting(){
    return {}
  }

  @Get('/home')
  @Render('home')
  home(){
    return {}
  }
}
