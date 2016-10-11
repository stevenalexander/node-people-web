exports.config = {
  services: ['sauce'],
  user: process.env.NODE_PEOPLE_WEB_SAUCE_USERNAME,
  key: process.env.NODE_PEOPLE_WEB_SAUCE_ACCESS_KEY,
  sauceConnect: true,
  specs: ['./test/e2e/**/*.js'],
  exclude: [],
  maxInstances: 1,
  capabilities: [{
    maxInstances: 1,
    browserName: 'firefox',
    platform: 'Windows 10',
    version: '49.0'
  },
  {
    maxInstances: 1,
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '8.0'
  }
],
  sync: false,
  logLevel: 'verbose',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: 'http://localhost:3000',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd'
  }
}
