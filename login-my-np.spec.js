import { test, expect } from '@playwright/test';
// логин через имейл-пароль
test('test', async ({ page }) => {
  await page.goto('https://auth.nuzhnapomosh.ru/');
  await page.getByPlaceholder('Email').fill('faoiukgrzxa@exelica.com');
  await page.getByRole('button', { name: 'Продолжить' }).click();
  await page.getByPlaceholder('Введите пароль').fill('Test123Test');
  await page.getByRole('button', { name: 'Войти' }).click();
  await page.waitForTimeout(10000);
  await page.goto('https://my.nuzhnapomosh.ru/');
  await page.getByRole('heading', { name: 'Личный кабинет' }).click();
  //await page.getByRole('link', { name: 'На главную Нужна помощь' }).click();
  await page.close();
});
