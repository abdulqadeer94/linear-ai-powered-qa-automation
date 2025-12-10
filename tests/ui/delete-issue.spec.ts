import { test, expect } from '@playwright/test';

test('Delete an issue from Linear', async ({ page }) => {
  await page.goto('/login');

  await page.getByPlaceholder('Enter your email').fill(process.env.LINEAR_EMAIL!);
  await page.getByRole('button', { name: 'Continue' }).click();

  await page.getByPlaceholder('Password').fill(process.env.LINEAR_PASSWORD!);
  await page.getByRole('button', { name: 'Log in' }).click();

  await page.waitForSelector('[data-test="home-view"]');

  // Open updated issue
  await page.getByText('Automation Test Issue - Updated').click();

  // Open menu
  await page.keyboard.press('Shift+Delete');

  // Confirm deletion
  await page.getByRole('button', { name: 'Delete' }).click();

  // Assert it is gone
  await expect(
    page.getByText('Automation Test Issue - Updated')
  ).not.toBeVisible();
});
