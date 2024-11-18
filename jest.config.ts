/** @type {import('ts-jest').JestConfigWithTsJest} **/
import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  moduleFileExtensions: ['js', 'ts'],
  moduleDirectories: ['node_modules', 'visual'],

  // below config was created when I ran npx ts-jest config:init
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};

export default config;
