import { Exclude } from 'class-transformer';

export class ResponseDto<T> {
  @Exclude() private status: boolean;
  @Exclude() private message: string;
  @Exclude() private data: T;

  constructor(message: string, data: T) {
    this.status = true;
    this.message = message;
    this.data = data;
  }

  static OK(message: string): ResponseDto<[]> {
    return new ResponseDto(message, []);
  }

  static OK_DATA<T>(message: string, data: T): ResponseDto<T> {
    return new ResponseDto(message, data);
  }
}
