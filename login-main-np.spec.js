import { test, expect } from '@playwright/test';
// логин с главной нп по паролю и возврат после логина снова на главную нп
test('test', async ({ page }) => {
  await page.goto('https://nuzhnapomosh.ru/');
  await page.getByRole('link', { name: 'войти' }).click();
  await page.getByPlaceholder('Email').fill('faoiukgrzxa@exelica.com');
  await page.getByRole('button', { name: 'Продолжить' }).click();
  await page.getByPlaceholder('Введите пароль').fill('Test123Test');
  await page.getByRole('button', { name: 'Войти' }).click();
  await page.waitForTimeout(10000);
  await page.goto('https://nuzhnapomosh.ru/');
  await page.getByRole('button', { name: 'Меню пользователя' }).click();
  await page.close();
});
