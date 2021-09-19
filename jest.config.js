module.exports = {
  roots: ['<rootDir>/tests'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: 'tests/.*\\.spec\\.ts',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 25,
      functions: 46,
      lines: 50,
    },
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};
