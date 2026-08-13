import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/web/LoginPage';

test.describe('SauceDemo login', () => {
    test('standard user can log in', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.open('/');
        const inventory = await loginPage.loginAs('standard_user', 'secret_sauce');

        expect(await inventory.getPageTitle()).toBe('Products');
        expect(await inventory.getItemCount()).toBeGreaterThan(0);
    });

    test('locked out user sees an error', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.open('/');
        await loginPage.submitLogin('locked_out_user', 'secret_sauce');

        expect(await loginPage.getErrorMessage()).toContain('locked out');
    });
});
