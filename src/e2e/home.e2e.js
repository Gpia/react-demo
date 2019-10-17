import puppeteer from 'puppeteer';

describe('Homepage', () => {
  it('it should have logo img', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:8080');
    await page.waitForSelector('#root');
    const hasRootElement = await page.evaluate(() => !!document.querySelector('#root'));
    expect(hasRootElement).toBe(true);
    await page.close();
    browser.close();
  });
});
