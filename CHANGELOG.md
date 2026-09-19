# Changelog

All notable changes to the WebAudits.pro platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2026-09-19

### Added
- Dedicated backend analyzers for free audit tools:
  - `lib/tool-analyzers/lcpAnalyzer.ts`: LCP candidate detection, fetchpriority audit, image dimension and format analysis.
  - `lib/tool-analyzers/headersAnalyzer.ts`: Comprehensive HTTP response header inspection, security headers scorecard (HSTS, CSP, XFO, XCTO, Referrer, Permissions), caching policy, and compression.
  - `lib/tool-analyzers/seoMetaAnalyzer.ts`: SERP preview simulator, pixel and character width validation, self-referential canonical check, robots directives, and Open Graph / Twitter card audits.
  - `lib/tool-analyzers/schemaValidator.ts`: JSON-LD script block parser, Schema.org type extraction, required and recommended field validation, and Google Rich Snippet eligibility matrix.
  - `lib/tool-analyzers/brokenLinkAnalyzer.ts`: Concurrent internal and external link crawler, HTTP HEAD and GET status verification, and broken link identification.
  - `lib/tool-analyzers/pageWeightAnalyzer.ts`: 1.5MB mobile performance budget meter, category payload breakdown (HTML, JS, CSS, Images, Fonts), and heaviest third-party assets list.
  - `lib/tool-analyzers/imageAnalyzer.ts`: WebP and AVIF modern format adoption, missing width and height CLS risk detection, missing alt text audit, and filterable inventory table.
  - `lib/tool-analyzers/speedAnalyzer.ts`: Server TTFB classification, network latency waterfall, and render-blocking head stylesheet and script detector with fix recommendations.
- Bespoke frontend result components:
  - `components/tool-results/LcpResult.tsx`
  - `components/tool-results/HttpHeaderResult.tsx`
  - `components/tool-results/SeoMetaResult.tsx`
  - `components/tool-results/SchemaValidatorResult.tsx`
  - `components/tool-results/BrokenLinkResult.tsx`
  - `components/tool-results/PageWeightResult.tsx`
  - `components/tool-results/ImageSizeResult.tsx`
  - `components/tool-results/WebsiteSpeedResult.tsx`

### Changed
- `app/api/audit/route.ts`: Added dynamic tool dispatch routing to individual analyzers while keeping fallback VitalsSniper outreach generation intact.
- `components/ToolRunnerClient.tsx`: Updated audit payload to forward `tool: tool.slug` and integrated dedicated result components before falling back to general performance audits.

## [1.2.0] - 2026-09-18

### Added
- Interactive tool runner integration for micro-SaaS audits.
- Schema.org JSON-LD automated validation test suite.
