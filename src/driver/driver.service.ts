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
    if (checkDrivingData == null) {
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
}
