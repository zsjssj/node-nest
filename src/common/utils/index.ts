//生成64位随机字符串
import { randomBytes } from 'crypto';
export function generateRandomString(length: number = 64): string {
  return randomBytes(length).toString('hex').slice(0, length);
}
