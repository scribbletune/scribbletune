import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.spec.ts'],
    coverage: {
      thresholds: {
        statements: 50,
        branches: 25,
        functions: 46,
        lines: 50,
      },
    },
  },
});
