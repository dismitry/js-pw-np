import { test, expect } from '@playwright/test';
// логин через mail, проверка, что находимся в лк
test('test', async ({ page }) => {

  await page.goto('https://auth.nuzhnapomosh.ru/');
  await page.getByRole('list').getByRole('button').nth(4).click();

  await page.getByPlaceholder('Account name').fill('htpthajh');
  await page.locator('[data-test-id="next-button"]').click();
  await page.getByPlaceholder('Password').fill('Alexey09');
  await page.locator('[data-test-id="submit-button"]').click();
  await page.waitForTimeout(10000);

  await page.goto('https://my.nuzhnapomosh.ru/setting');
  await page.getByRole('heading', { name: 'Личные данные' }).click();

  await page.close()
});
