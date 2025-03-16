import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'babel-jest', // Diz ao Jest para usar ts-jest para arquivos TypeScript
  },
};

export default config;
