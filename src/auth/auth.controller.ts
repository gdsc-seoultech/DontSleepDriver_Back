import { LocalAuthGuard } from './guard/local.guard';
import { AuthService } from './auth.service';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LoginRequest } from './dto/login.dto';
import { Request } from 'express';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/')
  async login(@Body() body: LoginRequest, @Req() request: Request) {
    console.log(request.user);
    return await this.authService.login(request.user);
  }
}
