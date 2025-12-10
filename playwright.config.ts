import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  expect: {
    timeout: 5000
  },
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    baseURL: 'https://linear.app',
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'test-report' }]
  ],
});
