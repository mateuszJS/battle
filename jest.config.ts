/** @type {import('ts-jest').JestConfigWithTsJest} **/
import type {Config} from 'jest';
import { createDefaultPreset, type JestConfigWithTsJest } from 'ts-jest'


const config: Config = {
  verbose: true,
  moduleFileExtensions: ['js', 'ts'],
  moduleDirectories: ['node_modules', 'visual'],

  // below config was created when I ran npx ts-jest config:init
  testEnvironment: "jsdom",
  
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
};

export default config;
