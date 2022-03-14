import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { UserRepository } from 'src/repositories/user.repository';
import { GpsRepository } from 'src/repositories/gps.repository';

@Module({
  imports: [],
  providers: [DriverService, UserRepository, PrismaModule, GpsRepository],
  controllers: [DriverController],
})
export class DriverModule {}
