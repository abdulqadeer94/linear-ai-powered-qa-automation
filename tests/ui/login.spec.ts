import { test, expect } from '@playwright/test';

test('Login to Linear', async ({ page }) => {
  await page.goto('/login');

  // Replace with your test account
  const email = process.env.LINEAR_EMAIL;
  const password = process.env.LINEAR_PASSWORD;

  await page.getByPlaceholder('Enter your email').fill(email!);
  await page.getByRole('button', { name: 'Continue' }).click();

  await page.getByPlaceholder('Password').fill(password!);
  await page.getByRole('button', { name: 'Log in' }).click();

  await page.waitForSelector('[data-test="home-view"]');
  await expect(page).toHaveURL(/issues/);
});
