import type { Browser } from 'webdriverio';
import { BaseScreen } from './BaseScreen';

/** Android Settings app search screen - no custom APK required. */
export class SettingsScreen extends BaseScreen {
    constructor(driver: Browser) {
        super(driver);
    }

    async openSearch(): Promise<this> {
        const icon = await this.driver.$('~Search settings');
        await icon.click();
        return this;
    }

    async searchFor(query: string): Promise<this> {
        const box = await this.driver.$('android=new UiSelector().resourceId("android:id/search_src_text")');
        await box.setValue(query);
        return this;
    }

    async getResults() {
        return this.driver.$$('android=new UiSelector().resourceId("android:id/title")');
    }
}
