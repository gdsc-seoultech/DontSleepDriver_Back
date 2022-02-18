import { ResponseDto } from './../common/dto/response.dto';
import { LocalAuthGuard } from './guard/local.guard';
import { AuthService } from './auth.service';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LoginRequest, LoginResponse } from './dto/login.dto';
import { Request } from 'express';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/')
  async login(
    @Body() body: LoginRequest,
    @Req() request: Request,
  ): Promise<ResponseDto<LoginResponse>> {
    console.log(request.user);
    const token = await this.authService.login(request.user);
    return ResponseDto.OK_DATA('로그인성공', { token });
  }
}
