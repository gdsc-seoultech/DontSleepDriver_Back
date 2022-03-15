import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDrvingRequest } from 'src/driver/dto/driver.dto';

@Injectable()
export class DrivingRepository {
  constructor(private prisma: PrismaService) {}

  async create(id: number, data: CreateDrvingRequest) {
    const { gpsLevel, gpsData, startTime, endTime, avgSleepLevel } = data;
    const gpsDataLat = gpsData.map(({ lat }) => lat);
    const gpsDataLng = gpsData.map(({ lng }) => lng);

    const createDriving = await this.prisma.driving.create({
      data: {
        startTime: startTime,
        endTime: endTime,
        avgSleepLevel,
        driverId: id,
      },
    });

    for (let idx = 0; idx < gpsData.length; idx++) {
      let lat = gpsDataLat[idx];
      let lng = gpsDataLng[idx];
      let level = gpsLevel[idx];

      await this.prisma.gpsData.create({
        data: {
          lat: lat,
          lng: lng,
          level: level,
          drivingId: createDriving.id,
        },
      });
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
