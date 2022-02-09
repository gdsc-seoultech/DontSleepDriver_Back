import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  expires: process.env.JWT_EXPIRES || '30m',
}));
