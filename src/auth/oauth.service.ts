import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class OauthService {
  constructor(private userRepository: UserRepository) {}

  async getKakaoUserInfo(token: string) {
    try {
      const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `bearer ${token}`,
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      });

      const email = response.data.kakao_account.email;
      if (!email) throw new HttpException('모든 항목에 동의해야 합니다', 401);

      const kakaoUser = {
        name: response.data.kakao_account.profile.nickname,
        email,
      };
      return kakaoUser;
    } catch (err) {
      console.log(err);
      throw new HttpException('kakao 유저 정보 조회 실패', 401);
    }
  }

  async getNaverUserInfo(token: string) {
    try {
      const response = await axios.get('https://openapi.naver.com/v1/nid/me', {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      //   const email = response.data.kakao_account.email;
      //   if (!email) throw new HttpException('모든 항목에 동의해야 합니다', 401);

      const naverUser = {
        name: response.data.response.data,
        email: response.data.response.email,
      };
      return naverUser;
    } catch (err) {
      console.log(err);
      throw new HttpException('naver 유저 정보 조회 실패', 401);
    }
  }

  async getGoogleUserInfo(token: string) {
    try {
      const response = await axios.get(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      );

      //   const email = response.data.kakao_account.email;
      //   if (!email) throw new HttpException('모든 항목에 동의해야 합니다', 401);

      const googleUser = {
        name: response.data.name,
        email: response.data.email,
      };
      return googleUser;
    } catch (err) {
      console.log(err);
      throw new HttpException('naver 유저 정보 조회 실패', 401);
    }
  }

  async oauthLogin(data: { email: string; provider: string; name: string }) {
    const { email, provider, name } = data;
    let findUser = await this.userRepository.findByUnique({
      emailId: { email, provider },
    });
    if (!findUser) {
      findUser = await this.userRepository.create(data);
    }

    delete findUser['password'];
    return findUser;
  }
}
