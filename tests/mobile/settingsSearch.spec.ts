import { test, expect } from '../../fixtures/mobileFixture';
import { SettingsScreen } from '../../src/pages/mobile/SettingsScreen';

test.describe('Android Settings search', () => {
    test('returns at least one result for "Wi-Fi"', async ({ mobileDriver }) => {
        const settings = new SettingsScreen(mobileDriver);
        await settings.openSearch();
        await settings.searchFor('Wi-Fi');

        const results = await settings.getResults();
        expect(results.length).toBeGreaterThan(0);
    });
});
