import { test as base } from '@playwright/test';
import { remote, type Browser } from 'webdriverio';
import { env } from '../src/config/env';

type IosFixtures = {
    iosDriver: Browser;
};

/**
 * Extends Playwright Test with an Appium session running on BrowserStack App
 * Automate, so the iOS suite shares the same runner/reporter/CLI as web and
 * Android, even though there's no local Mac/simulator to drive iOS directly.
 */
export const test = base.extend<IosFixtures>({
    iosDriver: async ({}, use, testInfo) => {
        const hubUrl = new URL(env.browserstack.hubUrl);
        const driver = await remote({
            hostname: hubUrl.hostname,
            port: hubUrl.port ? Number(hubUrl.port) : 443,
            path: hubUrl.pathname,
            protocol: hubUrl.protocol.replace(':', ''),
            capabilities: {
                platformName: 'iOS',
                'appium:deviceName': env.ios.deviceName,
                'appium:platformVersion': env.ios.platformVersion,
                'appium:app': env.browserstack.appId,
                'bstack:options': {
                    userName: env.browserstack.username,
                    accessKey: env.browserstack.accessKey,
                    projectName: 'Hybrid Web+Mobile TypeScript',
                    buildName: 'iOS BrowserStack',
                    sessionName: testInfo.title,
                    debug: true,
                },
            },
        });

        await use(driver);

        await driver.deleteSession();
    },
});

export { expect } from '@playwright/test';
