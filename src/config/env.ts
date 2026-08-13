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
};
