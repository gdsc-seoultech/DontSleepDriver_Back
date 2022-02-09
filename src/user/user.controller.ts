import { UserService } from './user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.dto';

@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async signUp(@Body() data: CreateUserRequest) {
    return this.userService.signUp(data);
  }
}
