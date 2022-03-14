import { Body, Controller, Get, Post, Req, Param } from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDrvingRequest } from './dto/driver.dto';

import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { UseGuards } from '@nestjs/common';
import { ResponseDto } from 'src/common/dto/response.dto';

import { JwtDriverLoadDto } from './dto/jwt-driver.dto';
import { User } from 'src/auth/auth.decorator';

@Controller('/api')
export class DriverController {
  constructor(private driverService: DriverService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/driver/gpsData')
  async createGpsData(
    @Body() gpsData: CreateDrvingRequest,
    @User() user: JwtDriverLoadDto,
  ) {
    let driverId = user.id;
    const data = await this.driverService.createDriving(driverId, gpsData);
    return ResponseDto.OK_DATA('DB 저장 성공', data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/driving/:page')
  //이거 파라미터 받는방법 알려주면 올리기
  async getDrivingInfo(
    @User() user: JwtDriverLoadDto,
    @Param('page') page: number,
  ) {
    let driverId = user.id;

    if (page == 0) {
      console.log(0);
      const data = await this.driverService.checkDriving(driverId);
      return ResponseDto.OK_DATA('DB 조회 성공', data);
    }

    const data = await this.driverService.getDriving(driverId, page);
    return ResponseDto.OK_DATA('DB 조회 성공', data);
  }
}
