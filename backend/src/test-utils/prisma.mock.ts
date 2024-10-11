import { PrismaClient } from '@prisma/client';
import { MockProxy, mockDeep } from 'jest-mock-extended';

export type MockContext = {
  prisma: MockProxy<PrismaClient>;
};

export const createMockContext = (): MockContext => {
  return {
    prisma: mockDeep<PrismaClient>(),
  };
};
