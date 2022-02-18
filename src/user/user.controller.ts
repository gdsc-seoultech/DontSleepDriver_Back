import { ResponseDto } from './../common/dto/response.dto';
import { JwtAuthGuard } from './../auth/guard/jwt.guard';
import { UserService } from './user.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.dto';
import { User } from 'src/auth/auth.decorator';
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';

@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async signUp(@Body() data: CreateUserRequest): Promise<ResponseDto<[]>> {
    await this.userService.signUp(data);
    return ResponseDto.OK('회원가입 성공');
  }

  //유저 정보 확인용, 기획은 없음
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserInfo(
    @User() user: JwtPayloadDto,
  ): Promise<ResponseDto<JwtPayloadDto>> {
    console.log(user);
    console.log('user getUserInfo');
    return ResponseDto.OK_DATA('유저 정보', user);
  }
}
