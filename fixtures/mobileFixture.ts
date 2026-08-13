import { test as base } from '@playwright/test';
import { remote, type Browser } from 'webdriverio';
import { env } from '../src/config/env';

type MobileFixtures = {
    mobileDriver: Browser;
};

/**
 * Extends Playwright Test with an Appium session so both web and mobile
 * suites share the same runner/reporter/CLI, even though mobile isn't
 * something Playwright drives natively.
 */
export const test = base.extend<MobileFixtures>({
    mobileDriver: async ({}, use) => {
        const appiumUrl = new URL(env.mobile.appiumServerUrl);
        const driver = await remote({
            hostname: appiumUrl.hostname,
            port: Number(appiumUrl.port),
            path: '/',
            capabilities: {
                platformName: 'Android',
                'appium:automationName': 'UiAutomator2',
                'appium:deviceName': env.android.deviceName,
                'appium:appPackage': env.android.appPackage,
                'appium:appActivity': env.android.appActivity,
                'appium:noReset': true,
                'appium:newCommandTimeout': 120,
            },
        });

        // appium:appPackage/appActivity alone don't reliably foreground a
        // pre-installed system app like Settings on every UiAutomator2
        // version - activate it explicitly so tests don't start on the
        // home screen.
        await driver.execute('mobile: startActivity', {
            intent: `${env.android.appPackage}/${env.android.appActivity}`,
        });

        await use(driver);

        await driver.deleteSession();
    },
});

export { expect } from '@playwright/test';
