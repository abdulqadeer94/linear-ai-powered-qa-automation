import { test, expect } from '@playwright/test';

test('Create a new issue in Linear', async ({ page }) => {
  await page.goto('/login');

  await page.getByPlaceholder('Enter your email').fill(process.env.LINEAR_EMAIL!);
  await page.getByRole('button', { name: 'Continue' }).click();

  await page.getByPlaceholder('Password').fill(process.env.LINEAR_PASSWORD!);
  await page.getByRole('button', { name: 'Log in' }).click();

  await page.waitForSelector('[data-test="home-view"]');

  // Create issue
  await page.keyboard.press('c'); // shortcut to create issue

  await page.getByPlaceholder('Issue title').fill('Automation Test Issue');
  await page.getByPlaceholder('Description').fill('Created via Playwright automation test.');

  await page.getByRole('button', { name: 'Create Issue' }).click();

  // Validate
  await expect(page.getByText('Automation Test Issue')).toBeVisible();
});
