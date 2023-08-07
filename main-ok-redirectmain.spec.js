import { test, expect } from '@playwright/test';
//главная - логин в ок - редирект на главную - разлог
test('test', async ({ page }) => {

  await page.goto('https://nuzhnapomosh.ru/');
  await page.getByRole('link', { name: 'войти' }).click();
  
  await page.getByRole('list').getByRole('button').nth(1).click();
  await page.getByLabel('Username, e-mail address, or phone number').fill('9219399680');
  await page.getByLabel('Password').fill('Alexey09');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.getByRole('link', { name: 'На главную Нужна помощь' });//проверка, что мы вернулись на главную
  await page.getByRole('button', { name: 'Меню пользователя' }).click();
  await page.getByRole('link', { name: 'Выйти' }).click();
  await page.getByRole('link', { name: 'войти' });//проверка, что произошел разлог

  await page.close();
});
