module.exports = {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: './tests/.*.spec.ts',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  collectCoverageFrom: ['**/*.{ts}', '!**/node_modules/**'],
  coverageThreshold: {
    global: {
      statements: 31.88,
      branches: 22.25,
      functions: 22.22,
      lines: 32.18,
    },
  },
};
