import { test, expect } from '@playwright/test';

const npURL = 'https://nuzhnapomosh.ru';
const authURL = 'https://auth.nuzhnapomosh.ru';

test('np auth and logout', async ({ page }) => {
  await page.goto(npURL);
  const authLink = page.locator('.js-np-header-button-auth');
  await authLink.click();
  await expect(page).toHaveURL(new RegExp(`^${authURL}`));

  await page.getByPlaceholder('Email').fill('faoiukgrzxa@exelica.com');
  await page.getByRole('button', { name: 'Продолжить' }).click();
  await page.getByPlaceholder('Введите пароль').fill('Test123Test');
  await page.getByRole('button', { name: 'Войти' }).click();
  await expect(page).toHaveURL(new RegExp(`^${npURL}`), { timeout: 10000 });

  const userMenuButton = page.locator('.js-np-header-button-user');
  // поставил ожидание, потому что проверка авторизации происходит на фронте
  await expect(userMenuButton).toBeVisible({ timeout: 10000 });
  await userMenuButton.click();

  await page.getByRole('link', { name: 'Выйти' }).click();
  await expect(page).toHaveURL(new RegExp(`^${npURL}`), { timeout: 10000 });
  
  await page.close();
});
