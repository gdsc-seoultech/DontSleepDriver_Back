import { Injectable, HttpException } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { GpsRepository } from 'src/repositories/gps.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDrvingRequest } from './dto/driver.dto';

@Injectable()
export class DriverService {
  constructor(
    private userRepository: UserRepository,
    private gpsRepository: GpsRepository,
  ) {}

  async createDriving(driverId: number, data: CreateDrvingRequest) {
    const checkDriverId = await this.userRepository.findByUnique({
      id: driverId,
    });
    if (checkDriverId == null) {
      console.log('없는 유저정보 입니다.');
      throw new HttpException('없는 유저정보입니다.', 404);
    }

    const drivingData = this.gpsRepository.create(driverId, data);
    return drivingData;
  }

  async checkDriving(id: number) {
    const checkDriverId = await this.userRepository.findByUnique({
      id: id,
    });
    if (checkDriverId == null) {
      console.log('없는 유저정보 입니다.');
      throw new HttpException('없는 유저정보입니다.', 404);
    }
    console.log('유저정보 확인완료');

    const checkDrivingData = await this.gpsRepository.checkData(id);
    if (checkDrivingData == 0) {
      throw new HttpException('저장된 데이터가 없습니다.', 404);
    }
    const pages = Math.ceil(checkDrivingData / 6);
    return pages;
  }

  async getDriving(id: number, page: number) {
    const checkDriverId = await this.userRepository.findByUnique({
      id: id,
    });
    if (checkDriverId == null) {
      console.log('없는 유저정보 입니다.');
      throw new HttpException('없는 유저정보입니다.', 404);
    }
    console.log('유저정보 확인완료');

    const drivingList = await this.gpsRepository.getDriving(id, page);
    return drivingList;
  }
}
