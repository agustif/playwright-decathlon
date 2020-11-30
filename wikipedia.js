const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  // Go to https://www.wikipedia.org/
  await page.goto('https://www.wikipedia.org/');

  // Click text="Español"
  await page.click('text="Español"');
  // assert.equal(page.url(), 'https://es.wikipedia.org/wiki/Wikipedia:Portada');

  // Click text="Pandemia de COVID-19"
  await page.click('text="Pandemia de COVID-19"');
  // assert.equal(page.url(), 'https://es.wikipedia.org/wiki/Pandemia_de_COVID-19');

  // Click //p[starts-with(normalize-space(.), 'La pandemia de COVID-19 es una pandemia derivada de la enfermedad por coronaviru')]
  await page.click('//p[starts-with(normalize-space(.), \'La pandemia de COVID-19 es una pandemia derivada de la enfermedad por coronaviru\')]');

  // Click text="pandemia de COVID-19"
  await page.click('text="pandemia de COVID-19"');

  // Click //p[starts-with(normalize-space(.), 'La pandemia de COVID-19 es una pandemia derivada de la enfermedad por coronaviru')]
  await page.click('//p[starts-with(normalize-space(.), \'La pandemia de COVID-19 es una pandemia derivada de la enfermedad por coronaviru\')]');

  // Click (//div[starts-with(normalize-space(.), 'Este artículo se refiere o está relacionado con un evento de salud pública recie')])[2]
  await page.click('(//div[starts-with(normalize-space(.), \'Este artículo se refiere o está relacionado con un evento de salud pública recie\')])[2]');

  // Click img[alt="COVID-19 Outbreak World Map.svg"]
  await page.click('img[alt="COVID-19 Outbreak World Map.svg"]');

  // Close page
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();