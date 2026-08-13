# Hybrid Web + Mobile Automation Framework (TypeScript)

A single [Playwright Test](https://playwright.dev) runner drives **both**
suites: web tests use Playwright's native browser automation, and mobile
tests use a custom `mobileDriver` fixture (`fixtures/mobileFixture.ts`) that
opens an Appium session through the `webdriverio` client library. Same test
runner, same reporter, same `npx playwright test` CLI for both platforms —
that's the hybrid part. (Playwright doesn't drive native mobile apps itself,
so mobile still goes through Appium, but it's wired into the same harness
instead of a second, disconnected toolchain.)

This intentionally uses a different stack from the plain-JavaScript project
in this repo family, which drives both platforms directly through
WebdriverIO's own capability switching.

## Stack

| Concern       | Tool                                     |
|---------------|--------------------------------------------|
| Web driver    | Playwright                                  |
| Mobile driver | `webdriverio` (remote()) talking to Appium  |
| Test runner   | Playwright Test (used for both projects)    |
| Language      | TypeScript                                  |

## Project layout

```
playwright.config.ts       # "web" and "mobile" projects
fixtures/mobileFixture.ts  # extends Playwright Test with an Appium session
src/config/env.ts
src/pages/web/             # BasePage, LoginPage, InventoryPage (Playwright locators)
src/pages/mobile/          # BaseScreen, SettingsScreen (webdriverio Browser)
tests/web/login.spec.ts        # saucedemo.com
tests/mobile/settingsSearch.spec.ts  # Android Settings app (no APK needed)
```

## Prerequisites

- Node.js 18+
- For mobile tests: Appium server (`npm i -g appium && appium`), Android
  emulator/device, `appium driver install uiautomator2`

## Setup

```bash
npm install
npx playwright install chromium
```

## Running tests

```bash
# Web
npm run test:web

# Mobile (requires Appium server running on 127.0.0.1:4723)
npm run test:mobile

# Type-check only
npm run typecheck
```

## CI

`.github/workflows/ci.yml` runs the web suite on every push/PR. Mobile tests
require a real device/emulator + Appium server, so they're left for local or
device-farm execution (`npm run test:mobile`).
