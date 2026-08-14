import { test, expect } from '../../fixtures/iosFixture';
import { SampleScreen } from '../../src/pages/ios/SampleScreen';

test.describe('BrowserStack sample app text echo', () => {
    test('echoes the submitted text into Text Output', async ({ iosDriver }) => {
        const sample = new SampleScreen(iosDriver);
        await sample.tapTextButton();
        await sample.enterText('hello@browserstack.com');

        const output = await sample.getOutputText();
        expect(output).toBe('hello@browserstack.com');
    });
});
