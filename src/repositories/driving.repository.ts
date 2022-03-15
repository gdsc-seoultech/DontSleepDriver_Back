import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDrvingRequest } from 'src/driver/dto/driver.dto';

@Injectable()
export class DrivingRepository {
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

    for (let idx = 0; idx < gpsdata.length; idx++) {
      let lat = gpsDataLat[idx];
      let lng = gpsDataLng[idx];
      let level = gpslevel[idx];

      const createGpsData = await this.prisma.gpsData.create({
        data: {
          lat: lat,
          lng: lng,
          level: level,
          drivingId: createDriving.id,
        },
      });

      console.log(createGpsData);
    }

    return createDriving;
  }

  async checkDriving(id: number) {
    const countLow = await await this.prisma.driving.aggregate({
      _count: {
        id: true,
      },
      where: {
        driverId: id,
      },
    });

    console.log(countLow._count.id);

    return countLow._count.id;
  }

  async getDriving(id: number, page: number) {
    const getDriving = await this.prisma.driving.findMany({
      skip: (page - 1) * 6,
      take: 6,
      where: {
        driverId: id,
      },
    });
    console.log(getDriving);

    return getDriving;
  }

  async findById(id: number) {
    const data = await this.prisma.driving.findUnique({
      where: { id },
      include: {
        gpsDatas: true,
      },
    });
    return data;
  }
}
