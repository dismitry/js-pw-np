import { test, expect } from '@playwright/test';

const npURL = 'https://nuzhnapomosh.ru';
const authURL = 'https://auth.nuzhnapomosh.ru';
const npSbpURL = `${npURL}/sbp-pay/`;
const sbpURL = 'https://qr.nspk.ru/';
const donateFormOptions = {
  npFormPayment: 'once',
  npFormSum: 50,
  npFormHelp: 0,
};
const donateFormProps = [];
Object.entries(donateFormOptions).forEach(([key, value]) => {
  donateFormProps.push(`${key}=${value}`);
});


test('np auth and sbp pay', async ({ page }) => {
  await page.goto(npURL);
  const authLink = page.locator('.js-np-header-button-auth');
  await authLink.click();
  // не хочет пускать прямой URL, приходится делать обработку через регулярку
  //
  // важно оставлять expect – это целевое ожидаемое действие, если его не прописать
  // и тест не показывает ошибок, это не значит, что он выполнился корректно
  await expect(page).toHaveURL(new RegExp(`^${authURL}`));

  // плохо, на фронте нужен уникальный параметр для инпутов и кнопок
  await page.getByPlaceholder('Email').fill('faoiukgrzxa@exelica.com');
  await page.getByRole('button', { name: 'Продолжить' }).click();
  await page.getByPlaceholder('Введите пароль').fill('Test123Test');
  await page.getByRole('button', { name: 'Войти' }).click();
  await expect(page).toHaveURL(new RegExp(`^${npURL}`), { timeout: 10000 });

  await page.goto(`${npURL}/pay/?${donateFormProps.join('&')}`);
  
  const sbpCheckbox = page.locator('#np-donate-form-payment-sbp');
  await sbpCheckbox.check();
  await expect(sbpCheckbox).toBeChecked({
    checked: true,
  });

  const offerCheckbox = page.locator('#np-donate-form-personal-offer');
  // как я понял, force необходим для кастомных чекбоксов, потому что у них другая разметка
  await offerCheckbox.check({force: true});
  await expect(offerCheckbox).toBeChecked({
    checked: true,
  });

  const personalCheckbox = page.locator('#np-donate-form-personal-offer-data');
  // опция с position нужна потому что в лейбле есть ссылка, и по-умолчанию
  // тест кликает на середину строки, и попадает как раз на ссылку
  await personalCheckbox.check({
    force: true,
    position: { x: 10, y: 10 },
  });
  await expect(personalCheckbox).toBeChecked({
    checked: true,
  });

  const payButton = page.locator('.js-np-donate-form-submit-sbp');
  await payButton.click();
  await expect(page).toHaveURL(new RegExp(`^${npSbpURL}`));

  const sbpQRCode = page.locator('.js-np-donate-form-sbp-qr');
  await sbpQRCode.click();
  await expect(page).toHaveURL(new RegExp(`^${sbpURL}`));
  
  await page.close();
});
