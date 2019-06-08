module.exports = {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: './tests/.*.spec.ts',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 25,
      functions: 50,
      lines: 50,
    },
  },
};
