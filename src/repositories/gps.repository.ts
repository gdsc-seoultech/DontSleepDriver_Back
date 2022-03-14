import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDrvingRequest } from 'src/driver/dto/driver.dto';

@Injectable()
export class GpsRepository {
  constructor(private prisma: PrismaService) {}

  async create(id: number, data: CreateDrvingRequest) {
    const { gpslevel, gpsdata, startTime, endTime, avgsleeplevel } = data;
    let gpsDataLat = gpsdata.map(({ lat }) => lat);
    let gpsDataLng = gpsdata.map(({ lng }) => lng);

    const createDriving = await this.prisma.driving.create({
      data: {
        startTime: startTime,
        endTime: endTime,
        avgSleepLevel: avgsleeplevel,
        driverId: id,
      },
    });

    let getDrivingId = await this.prisma.driving.aggregate({
      _count: {
        id: true,
      },
      where: {
        driverId: id,
      },
    });

    var value = getDrivingId[Object.keys(getDrivingId)[0]];
    const gps_data_id = value[Object.keys(value)[0]];

    for (let idx = 0; idx < gpsdata.length; idx++) {
      let lat = gpsDataLat[idx];
      let lng = gpsDataLng[idx];
      let level = gpslevel[idx];

      const createGpsData = await this.prisma.gpsData.create({
        data: {
          lat: lat,
          lng: lng,
          level: level,
          gpsDataId: gps_data_id,
        },
      });

      console.log(createGpsData);
    }

    return createDriving;
  }

  async checkData(id: number) {
    // const countLow = await this.prisma
    //   .$queryRaw`SELECT COUNT(*) FROM drivings WHERE driver_id = ${id} `;

    const countLow = await await this.prisma.driving.aggregate({
      _count: {
        id: true,
      },
      where: {
        driverId: id,
      },
    });

    var value = countLow[Object.keys(countLow)[0]];
    var drivingLow = value[Object.keys(value)[0]];

    return drivingLow;
  }

  async getDriving(id: number, page: number) {
    const getDriving = await this.prisma.driving.findMany({
      skip: (page - 1) * 6,
      take: 6,
    });
    console.log(getDriving);

    return getDriving;
  }
}
