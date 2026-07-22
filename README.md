# AnalyticsClarity Tracker

The small browser tracker served by [AnalyticsClarity](https://analyticsclarity.com). This repository exists so customers, security teams, and privacy advocates can inspect the exact code that runs in a visitor's browser.

It is an MIT-licensed derivative of the [Umami tracker](https://github.com/umami-software/umami), maintained separately to make the privacy-sensitive browser surface easy to audit.

## Privacy promise

Production AnalyticsClarity builds use `STRICT_DSGVO=1`. In that build the tracker:

- does not set cookies;
- does not create a persistent browser identifier;
- does not read `window.screen` or `navigator.language`;
- makes `umami.identify()` a no-op;
- sends requests with `credentials: "omit"` by default.

The receiving service must enforce the same strict mode. The browser script alone cannot determine server-side storage, IP handling, or retention; see the [AnalyticsClarity privacy policy](https://analyticsclarity.com/datenschutz) for the hosted-service commitments.

## Build and audit

Requires Node.js 20+ and pnpm.

```sh
pnpm install
STRICT_DSGVO=1 COLLECT_API_HOST=https://script.aclaritytag.com pnpm build
pnpm verify:strict
```

The production artifact is `dist/script.js`. It deliberately is not committed: a release must be reproducibly built with its collection host and strict-mode flag explicitly supplied.

To use a self-hosted endpoint, replace `COLLECT_API_HOST` with its HTTPS origin. It must implement Umami-compatible `/api/send` handling and enforce its own privacy policy.

## Embed

```html
<script defer src="https://script.aclaritytag.com/script.js" data-website-id="YOUR_WEBSITE_ID"></script>
```

## Public release checklist

1. Review `src/index.js` and run `pnpm verify:strict`.
2. Create a GitHub release from a clean commit and attach the generated `dist/script.js` plus its SHA-256 checksum.
3. Record the source commit and build command in the release notes.
4. Update the hosted script only with the matching reviewed release artifact.

## Scope and security reporting

This repository contains only the browser tracker. For hosted-service support or a security report, contact the AnalyticsClarity team privately rather than posting sensitive details in a public issue.
