import { test, expect } from '@playwright/test';
// логин через ок, проверка, что находимся в лк (предпоследняя строка)
test('test', async ({ page }) => {
  await page.goto('https://auth.nuzhnapomosh.ru/');
  await page.getByRole('list').getByRole('button').nth(1).click();
  await page.getByLabel('Username, e-mail address, or phone number').fill('79219399680');
  await page.getByLabel('Password').fill('Alexey09');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForTimeout(10000);
  await page.goto('https://my.nuzhnapomosh.ru/');
  await page.getByRole('heading', { name: 'Личный кабинет' }).click();
  await page.close();
});
