import {Controller, Request, Get, Post, UseGuards} from '@nestjs/common'
import {LocalAuthGuard} from './auth/guards/local-auth.guard'
import {AppService} from './app.service'
import {AuthService} from './auth/auth.service'
import {Public} from './common/decorators/publid.decorator'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }
}
