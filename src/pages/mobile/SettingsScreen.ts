import type { Browser } from 'webdriverio';
import { BaseScreen } from './BaseScreen';

/** Android Settings app search screen - no custom APK required. */
export class SettingsScreen extends BaseScreen {
    constructor(driver: Browser) {
        super(driver);
    }

    async openSearch(): Promise<this> {
        const icon = await this.driver.$('android=new UiSelector().resourceId("com.android.settings:id/search_action_bar")');
        await icon.click();
        return this;
    }

    // Tapping the search bar hands off to the separate Settings Suggestions
    // (search) app, whose edit text lives under its own package id.
    async searchFor(query: string): Promise<this> {
        const box = await this.driver.$(
            'android=new UiSelector().resourceId("com.google.android.settings.intelligence:id/open_search_view_edit_text")'
        );
        await box.setValue(query);
        return this;
    }

    async getResults() {
        return this.driver.$$('android=new UiSelector().resourceId("android:id/title")');
    }
}
