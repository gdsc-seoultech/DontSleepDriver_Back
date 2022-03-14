import {
  IsDate,
  IsInt,
  IsArray,
  ValidateNested,
  IsNumber,
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
  gpsdata: gpsData[];

  @Type(() => Date)
  @IsDate()
  startTime: Date;

  @Type(() => Date)
  @IsDate()
  endTime: Date;

  @IsArray()
  @IsInt({ each: true })
  gpslevel: number;

  @IsNumber()
  avgsleeplevel: number;
}
