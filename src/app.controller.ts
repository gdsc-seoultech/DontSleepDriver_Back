import { ResponseDto } from './common/dto/response.dto';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  async test() {
    return ResponseDto.OK_DATA('성공', { test: '1234' });
  }
}
