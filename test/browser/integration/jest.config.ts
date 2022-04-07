import { dirname } from 'path';

const rootDir = dirname(require.resolve('../../package.json'));

const config = {
  rootDir,
  testMatch: ['<rootDir>/tests/browser/**/*.tests.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  verbose: true,
  transform: { '^.+\\.ts(x?)$': 'ts-jest' },
  globals: {
    'ts-jest': { tsconfig: '<rootDir>/tsconfig.json' },
    __DEBUG__: false,
    product: 'chrome',
  },
  setupFiles: ['dotenv/config'],
  roots: ['<rootDir>/test'],
  setupFilesAfterEnv: ['jest-extended/all'],
  coverageThreshold: {
    global: {
      lines: 95,
    },
  },
};

export default config;
