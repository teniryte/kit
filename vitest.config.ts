import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    includeSource: ["src/**/*.ts"],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
    },
  },
});
