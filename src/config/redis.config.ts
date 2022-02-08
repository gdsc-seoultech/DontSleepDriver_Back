import { registerAs } from '@nestjs/config';

export default registerAs('redis', () => ({
  url: process.env.REDIS_URL,
  port: parseInt(process.env.REDIS_PORT),
}));
