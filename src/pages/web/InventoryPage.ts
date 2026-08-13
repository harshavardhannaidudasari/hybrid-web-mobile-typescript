import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
    private readonly pageTitle = this.page.locator('.title');
    private readonly inventoryItems = this.page.locator('.inventory_item');

    constructor(page: Page) {
        super(page);
    }

    async getPageTitle(): Promise<string> {
        return (await this.pageTitle.textContent()) ?? '';
    }

    async getItemCount(): Promise<number> {
        return this.inventoryItems.count();
    }
}
