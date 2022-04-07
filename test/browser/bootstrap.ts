import puppeteer from 'puppeteer';

declare type BootstrapOptions = {
  devtools?: boolean;
  slowMo?: boolean;
  appUrl?: string;
};

async function bootstrap(options: BootstrapOptions = {}) {
  const { devtools = false, slowMo = false, appUrl } = options;

  if (appUrl == null) {
    return {};
  }

  const browser = await puppeteer.launch({
    headless: false,
    devtools,
    args: ['--disable-extensions-except=./dist', '--load-extension=./dist'],
    ...(slowMo && { slowMo: 1 }),
  });

  const appPage = await browser.newPage();
  await appPage.goto(appUrl, { waitUntil: 'load' });

  const targets = await browser.targets();
  const extensionTarget = targets.find(
    (target) => target.type() === 'service_worker',
  );
  if (extensionTarget == null) {
    return {};
  }
  const partialExtensionUrl = extensionTarget.url() || '';
  const [, , extensionId] = partialExtensionUrl.split('/');

  const extPage = await browser.newPage();
  const extensionUrl = `chrome-extension://${extensionId}/popup.html`;
  await extPage.goto(extensionUrl, { waitUntil: 'load' });

  return {
    appPage,
    browser,
    extensionUrl,
    extPage,
  };
}

export default bootstrap;
