# Hybrid Web + Mobile Automation Framework (TypeScript)

[![CI](https://github.com/harshavardhannaidudasari/hybrid-web-mobile-typescript/actions/workflows/ci.yml/badge.svg)](https://github.com/harshavardhannaidudasari/hybrid-web-mobile-typescript/actions/workflows/ci.yml)

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
playwright.config.ts       # "web", "mobile" and "ios" projects
fixtures/mobileFixture.ts  # extends Playwright Test with a local Appium session (Android)
fixtures/iosFixture.ts     # extends Playwright Test with a BrowserStack App Automate session (iOS)
src/config/env.ts
src/pages/web/             # BasePage, LoginPage, InventoryPage (Playwright locators)
src/pages/mobile/          # BaseScreen, SettingsScreen (webdriverio Browser)
src/pages/ios/             # SampleScreen (webdriverio Browser, drives BStackSampleApp)
tests/web/login.spec.ts        # saucedemo.com
tests/mobile/settingsSearch.spec.ts  # Android Settings app (no APK needed)
tests/ios/sample.spec.ts             # BrowserStack sample app (BStackSampleApp)
```

## Prerequisites

- Node.js 18+
- For mobile tests: Appium server (`npm i -g appium && appium`), Android
  emulator/device, `appium driver install uiautomator2`
- For iOS tests: a [BrowserStack](https://www.browserstack.com/app-automate)
  account (App Automate) - see below. No local Mac/simulator is required
  since the session runs on BrowserStack's real-device cloud.

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

# iOS (requires BrowserStack credentials - see below)
npm run test:ios

# Type-check only
npm run typecheck
```

## iOS (BrowserStack App Automate)

The `ios` project (`tests/ios/`) runs against
[BrowserStack App Automate](https://www.browserstack.com/app-automate)
instead of a local Mac/simulator, since local iOS simulation isn't possible
on this machine. It drives BrowserStack's own public demo app,
**BStackSampleApp**, tapping `Text Button`, typing into `Text Input`, and
asserting the value round-trips into `Text Output`.

### One-time setup: upload the sample app

BrowserStack needs the `.ipa` uploaded to their storage once; the returned
`app_url` becomes `BROWSERSTACK_APP_ID`:

```bash
curl -u "$BROWSERSTACK_USERNAME:$BROWSERSTACK_ACCESS_KEY" -X POST "https://api-cloud.browserstack.com/app-automate/upload" \
  -F "url=https://www.browserstack.com/app-automate/sample-apps/ios/BStackSampleApp.ipa"
```

This returns `{"app_url":"bs://<hash>"}` - use that full `bs://...` string as
`BROWSERSTACK_APP_ID`.

### Required environment variables

| Variable                  | Description                                              | Default                                       |
|----------------------------|------------------------------------------------------------|------------------------------------------------|
| `BROWSERSTACK_USERNAME`    | BrowserStack account username                               | *(none - required)*                            |
| `BROWSERSTACK_ACCESS_KEY`  | BrowserStack access key                                     | *(none - required)*                            |
| `BROWSERSTACK_APP_ID`      | `bs://...` value returned by the upload step above          | *(none - required)*                            |
| `BROWSERSTACK_HUB_URL`     | App Automate hub URL                                        | `https://hub-cloud.browserstack.com/wd/hub`     |
| `IOS_DEVICE_NAME`          | Target device                                                | `iPhone 14`                                     |
| `IOS_PLATFORM_VERSION`     | Target iOS version                                           | `17`                                            |

### Running just the iOS suite

```bash
npx playwright test --project=ios
```

## CI

`.github/workflows/ci.yml` runs the web suite on every push/PR. Mobile and
iOS tests require a real device/emulator + Appium server, or BrowserStack
credentials respectively, so they're left for local or device-farm execution
(`npm run test:mobile`, `npm run test:ios`).
