import { Injectable, HttpException } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { LoginRequest } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(data: LoginRequest) {
    const { email, password } = data;
    const findUser = await this.userRepository.findByUnique({ email });

    if (findUser && (await bcrypt.compare(password, findUser.password))) {
      const { password, ...result } = findUser;

      return result;
    } else {
      throw new HttpException('이메일과 비밀번호를 확인해주세요', 400);
    }
  }

  async login(user): Promise<string> {
    const payload: JwtPayloadDto = { email: user.email, id: user.id };
    return this.jwtService.sign(payload);
  }
}
