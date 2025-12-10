import { test, expect } from '@playwright/test';

test('Update an existing Issue', async ({ page }) => {
  await page.goto('/login');

  await page.getByPlaceholder('Enter your email').fill(process.env.LINEAR_EMAIL!);
  await page.getByRole('button', { name: 'Continue' }).click();

  await page.getByPlaceholder('Password').fill(process.env.LINEAR_PASSWORD!);
  await page.getByRole('button', { name: 'Log in' }).click();

  await page.waitForSelector('[data-test="home-view"]');

  // Open the recently created issue
  await page.getByText('Automation Test Issue').click();

  // Update title
  const updatedTitle = 'Automation Test Issue - Updated';
  await page.getByPlaceholder('Issue title').fill(updatedTitle);

  // Change status if possible
  const statusDropdown = page.locator('[data-test="state-picker"]');
  if (await statusDropdown.isVisible()) {
    await statusDropdown.click();
    await page.getByText('In Progress').click();
  }

  await page.getByRole('button', { name: 'Close' }).click();

  // Assert
  await expect(page.getByText(updatedTitle)).toBeVisible();
});
