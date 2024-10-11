import { randomBytes } from 'crypto';

export function generateToken(length: number): string {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charsLength = chars.length;
  let token = '';

  const randomValues = randomBytes(length);

  for (let i = 0; i < length; i++) {
    const randomIndex = randomValues[i] % charsLength;
    token += chars[randomIndex];
  }

  return token;
}
