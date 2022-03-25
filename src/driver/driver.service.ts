import { Injectable, HttpException } from '@nestjs/common';
import { DrivingRepository } from 'src/repositories/driving.repository';

import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';
import { CreateDrvingRequest } from './dto/driver.dto';

@Injectable()
export class DriverService {
  constructor(private drivingRepository: DrivingRepository) {}

  async createDriving(user: JwtPayloadDto, data: CreateDrvingRequest) {
    let driverId = user.id;
    console.log(driverId);

    const drivingData = this.drivingRepository.create(driverId, data);
    return drivingData;
  }

  async checkDriving(user: JwtPayloadDto) {
    let id = user.id;
    console.log(id);

    let checkDrivingData = await this.drivingRepository.checkDriving(id);
    console.log('checkDriving');
    console.log(checkDrivingData);

    if (checkDrivingData == 0) {
      return checkDrivingData;
    }

    const pages = Math.ceil(checkDrivingData / 6);
    return pages;
  }

  async getDriving(user: JwtPayloadDto, page: number) {
    let id = user.id;
    console.log('유저정보 확인완료');

    const drivingList = await this.drivingRepository.getDriving(id, page);
    return drivingList;
  }

  async getGpsData(id: number) {
    const drivingData = await this.drivingRepository.findById(id);
    if (drivingData == null) {
      throw new HttpException('잘못된 요청입니다.', 404);
    }

    console.log(drivingData);

    let gpsData = [];
    let gpsLevel = [];

    drivingData.gpsDatas.map(({ lat, lng, level }) => {
      gpsData.push({ lat: lat, lng: lng });
      gpsLevel.push(level);
    });

    delete drivingData.gpsDatas;

    return { ...drivingData, gpsData, gpsLevel };
  }
}
