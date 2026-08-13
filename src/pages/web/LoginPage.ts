import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { InventoryPage } from './InventoryPage';

export class LoginPage extends BasePage {
    private readonly username = this.page.locator('#user-name');
    private readonly password = this.page.locator('#password');
    private readonly loginButton = this.page.locator('#login-button');
    private readonly errorMessage = this.page.locator("[data-test='error']");

    constructor(page: Page) {
        super(page);
    }

    async loginAs(user: string, pass: string): Promise<InventoryPage> {
        await this.submitLogin(user, pass);
        return new InventoryPage(this.page);
    }

    async submitLogin(user: string, pass: string): Promise<void> {
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.loginButton.click();
    }

    async getErrorMessage(): Promise<string> {
        return (await this.errorMessage.textContent()) ?? '';
    }
}
