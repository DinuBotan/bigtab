import { dirname } from 'path';

const rootDir = dirname(require.resolve('../../package.json'));

const config = {
  rootDir,
  testMatch: ['<rootDir>/test/unit/**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testEnvironment: 'node',
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  globals: {
    'ts-jest': { tsconfig: '<rootDir>/tsconfig.json' },
    __DEBUG__: false,
  },
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['jest-extended/all'],
  roots: ['<rootDir>/test'],
  coverageThreshold: {
    global: {
      lines: 95,
    },
  },
};

export default config;
