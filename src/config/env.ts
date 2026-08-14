export const env = {
    web: {
        baseUrl: process.env.WEB_BASE_URL ?? 'https://www.saucedemo.com',
    },
    mobile: {
        appiumServerUrl: process.env.APPIUM_URL ?? 'http://127.0.0.1:4723',
    },
    android: {
        deviceName: process.env.ANDROID_DEVICE_NAME ?? 'Android Emulator',
        appPackage: 'com.android.settings',
        appActivity: '.Settings',
    },
    ios: {
        deviceName: process.env.IOS_DEVICE_NAME ?? 'iPhone 14',
        platformVersion: process.env.IOS_PLATFORM_VERSION ?? '16',
    },
    browserstack: {
        hubUrl: process.env.BROWSERSTACK_HUB_URL ?? 'https://hub-cloud.browserstack.com/wd/hub',
        username: process.env.BROWSERSTACK_USERNAME ?? '',
        accessKey: process.env.BROWSERSTACK_ACCESS_KEY ?? '',
        appId: process.env.BROWSERSTACK_APP_ID ?? '',
    },
};
