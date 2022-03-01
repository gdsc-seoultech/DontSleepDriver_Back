import { OauthNaverGuard } from './guard/oauth-naver.guard';
import { OauthLoginRequest } from './dto/oauth-login.dto';
import { ResponseDto } from './../common/dto/response.dto';
import { LocalAuthGuard } from './guard/local.guard';
import { AuthService } from './auth.service';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LoginRequest, LoginResponse } from './dto/login.dto';
import { Request } from 'express';
import { OauthKakaoGuard } from './guard/oauth-kakao.guard';
import { OauthGoogleGuard } from './guard/oauth-google.guard';

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

  @UseGuards(OauthKakaoGuard)
  @Post('/kakao')
  async kakaoLogin(@Body() body: OauthLoginRequest, @Req() request: Request) {
    console.log(request.user);
    const token = await this.authService.login(request.user);
    return ResponseDto.OK_DATA('카카오 로그인성공', { token });
  }

  @UseGuards(OauthNaverGuard)
  @Post('/naver')
  async naverLogin(@Body() body: OauthLoginRequest, @Req() request: Request) {
    console.log(request.user);
    const token = await this.authService.login(request.user);
    return ResponseDto.OK_DATA('네이버 로그인성공', { token });
  }

  @UseGuards(OauthGoogleGuard)
  @Post('/google')
  async googleLogin(@Body() body: OauthLoginRequest, @Req() request: Request) {
    console.log(request.user);
    const token = await this.authService.login(request.user);
    return ResponseDto.OK_DATA('구글 로그인성공', { token });
  }
}
