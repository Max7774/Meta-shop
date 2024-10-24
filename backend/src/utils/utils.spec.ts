import { convertToNumber } from './convert-to-number';
import { convertToSlug } from './convertToSlug';
import { getRandomNumber } from './random-number';
import { uuidGen } from './uuidGenerator';
import { generateToken } from './generateToken';

describe('convertToNumber', () => {
  it('should convert a valid string to a number', () => {
    expect(convertToNumber('42')).toBe(42);
  });
});

describe('convertToSlug', () => {
  it('should convert a string to a slug', () => {
    expect(convertToSlug('Hello World')).toBe('hello-world');
  });

  it('should handle special characters', () => {
    expect(convertToSlug('Hello, World!')).toBe('hello-world');
  });

  it('should handle multiple spaces', () => {
    expect(convertToSlug('Hello    World')).toBe('hello-world');
  });

  it('should handle empty strings', () => {
    expect(convertToSlug('')).toBe('');
  });
});

describe('getRandomNumber', () => {
  it('should generate a number between min and max', () => {
    const min = 1;
    const max = 10;
    const result = getRandomNumber(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });

  it('should generate different numbers on consecutive calls', () => {
    const result1 = getRandomNumber(1, 100);
    const result2 = getRandomNumber(1, 100);
    expect(result1).not.toBe(result2);
  });
});

describe('uuidGenerator', () => {
  it('should generate a valid UUID', () => {
    const uuid = uuidGen();
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(uuid).toMatch(uuidRegex);
  });

  it('should generate different UUIDs on consecutive calls', () => {
    const uuid1 = uuidGen();
    const uuid2 = uuidGen();
    expect(uuid1).not.toBe(uuid2);
  });
});

describe('generateToken', () => {
  it('should generate a token of the correct length', () => {
    const length = 16;
    const token = generateToken(length);
    expect(token.length).toBe(length);
  });

  it('should generate different tokens on consecutive calls', () => {
    const token1 = generateToken(16);
    const token2 = generateToken(16);
    expect(token1).not.toBe(token2);
  });

  it('should contain only valid characters', () => {
    const token = generateToken(20);
    const validChars = /^[A-Za-z0-9]+$/;
    expect(token).toMatch(validChars);
  });
});
