import type { Browser } from 'webdriverio';
import { BaseScreen } from '../mobile/BaseScreen';

/**
 * BrowserStack's official public "BStackSampleApp" iOS demo app - built
 * specifically for smoke-testing App Automate. No custom APK/IPA needed
 * beyond the one-time upload described in the README.
 */
export class SampleScreen extends BaseScreen {
    constructor(driver: Browser) {
        super(driver);
    }

    async tapTextButton(): Promise<this> {
        const button = await this.driver.$('~Text Button');
        await button.click();
        return this;
    }

    async enterText(value: string): Promise<this> {
        const input = await this.driver.$('~Text Input');
        await input.click();
        await input.addValue(`${value}\n`);
        return this;
    }

    async getOutputText(): Promise<string> {
        const output = await this.driver.$('~Text Output');
        await output.waitForDisplayed();
        return output.getText();
    }
}
