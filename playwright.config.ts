import { defineConfig, devices } from '@playwright/test';
import { env } from './src/config/env';

export default defineConfig({
    timeout: 60_000,
    fullyParallel: true,
    reporter: [['list']],
    projects: [
        {
            name: 'web',
            testDir: './tests/web',
            use: { ...devices['Desktop Chrome'], baseURL: env.web.baseUrl },
        },
        {
            name: 'mobile',
            testDir: './tests/mobile',
            // No browser is launched here - the mobileDriver fixture opens an
            // Appium session instead. Keep web and mobile as separate
            // projects so `--project` picks the right one without pulling in
            // the other platform's setup.
            workers: 1,
        },
        {
            name: 'ios',
            testDir: './tests/ios',
            // No browser is launched here either - the iosDriver fixture
            // opens an Appium session against BrowserStack App Automate.
            // Separate testDir from "mobile" (Android/local Appium) so
            // `--project=ios` cleanly selects only the BrowserStack suite.
            workers: 1,
        },
    ],
});
