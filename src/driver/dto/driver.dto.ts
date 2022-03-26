import {
  IsDate,
  IsInt,
  IsArray,
  ValidateNested,
  IsNumber,
  IsString,
} from 'class-validator';

import { Type } from 'class-transformer';

class gpsData {
  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;
}

export class CreateDrvingRequest {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => gpsData)
  gpsData: gpsData[];

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;

  @IsArray()
  @IsInt({ each: true })
  gpsLevel: number;

  @IsNumber()
  avgSleepLevel: number;

  @IsNumber()
  totalTime: number;
}
