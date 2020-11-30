const assert = require('assert');
const { chromium } = require('playwright');
var myArgs = process.argv.slice(2);
myArgs[0] ? console.log(
    `Checking stock status of ${myArgs[0]}`
    ) : console.log(
    `Checking stock status of Rodillo`
    );
(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    // Blocking un-needed stuff to make it faster
    await page.route('**/*.{png,jpg,jpeg,css,js,woff}', route => route.abort());
    // Abort based on the request type
    await page.route('**/*', route => {
    return route.request().resourceType() === ['image', 'stylesheet', 'font', 'script'] ?
        route.abort() : route.continue();
    });
    try {

        await page.goto(myArgs[0] || 'https://www.decathlon.es/es/p/rodillo-de-bicicleta-btwin-in-ride-100-resistencia-manual-550-w/_/R-p-14683?mc=8402844');
        // await page.click('#footer_tc_privacy_button')
        try {
            // await page.screenshot({ path: `no-stock.png` });
            const OutOfStock = await page.$eval('#conversion-zone > section > div > div:nth-child(1) > div > div.stock-notification__invite.stock-notification__invite--active > h3', el => el.textContent.trim())
            assert.equal(OutOfStock, 'Actualmente agotado')
            console.log('\x1b[30m\x1b[41m'+` ${OutOfStock} `+'\x1b[0m')
        } catch {
            // await page.screenshot({ path: `has-stock.png` });
            const Stock = await page.$eval('#conversion-zone > section > div > div:nth-child(1) > div > div.stock-infos > div > i', el => el.textContent.trim())
            assert.equal(Stock, 'En stock')
            console.log('\x1b[30m\x1b[42m'+` ${Stock} `+'\x1b[0m')
        }
        } catch {
            console.log('Not connected')
    }
    await browser.close();
})();