import type { Browser } from 'webdriverio';

export class BaseScreen {
    constructor(protected readonly driver: Browser) {}
}
