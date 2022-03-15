import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDrvingRequest } from './dto/driver.dto';

import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { UseGuards } from '@nestjs/common';
import { ResponseDto } from 'src/common/dto/response.dto';

import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';
import { User } from 'src/auth/auth.decorator';

@Controller('/api/driver')
export class DriverController {
  constructor(private driverService: DriverService) {}

  //데이터 저장
  @UseGuards(JwtAuthGuard)
  @Post('/gpsData')
  async createGpsData(
    @Body() gpsData: CreateDrvingRequest,
    @User() user: JwtPayloadDto,
  ) {
    const data = await this.driverService.createDriving(user, gpsData);
    return ResponseDto.OK_DATA('driving, gpsData 저장 완료', data);
  }

  //페이지 수 출력
  @UseGuards(JwtAuthGuard)
  @Get('/pages')
  async getPageInfo(@User() user: JwtPayloadDto) {
    const data = await this.driverService.checkDriving(user);
    return ResponseDto.OK_DATA('pages 조회 성공', data);
  }

  //페이지 로드
  @UseGuards(JwtAuthGuard)
  @Get('/list/:page')
  async getDrivingInfo(
    @User() user: JwtPayloadDto,
    @Param('page') page: number,
  ) {
    const data = await this.driverService.getDriving(user, page);
    return ResponseDto.OK_DATA('page 조회 성공', data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getGpsDataInfo(@Param('id', ParseIntPipe) id: number) {
    const data = await this.driverService.getGpsData(id);
    return ResponseDto.OK_DATA('driving 조회 성공', data);
  }
}
