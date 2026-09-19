# Changelog

All notable changes to the WebAudits.pro platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.5.0] - 2026-09-19

### Added
- SERP snippets and rich snippet optimization across all 17 tools (`data/tools.ts`, `app/tools/[slug]/page.tsx`):
  - Calibrated, high-intent title tags under 60 characters / 580px with front-loaded target keywords.
  - Action-oriented, benefit-first meta descriptions under 155 characters.
  - Complete Open Graph (`og:title`, `og:description`, `og:image`, `og:type`) and Twitter large image summary cards.
  - Rich snippet star eligibility via Schema.org `WebApplication` markup with `aggregateRating` (4.9/5 stars across 84 benchmark reviews) and `offers` (free USD tier).
- Comparison routes metadata upgrade (`app/comparisons/[slug]/page.tsx`):
  - Added self-referential canonical tags, complete Open Graph images, and Twitter cards.
- Homepage SERP metadata polish (`app/page.tsx`):
  - Complete Open Graph and Twitter card specifications for social crawlers.

## [1.4.0] - 2026-09-19

### Added
- Human-friendly "Plain English Verdict" component (`components/ui/PlainEnglishVerdict.tsx`):
  - 10-second TL;DR summary with color-coded traffic light impact badges (Looking Good, Room to Improve, Action Needed).
  - Explicit business impact callouts explaining what metrics mean for sales, SEO traffic, and conversion rates.
  - "Top Priority Fix" recommendations highlighting the single most urgent task.
  - "No-Code CMS Tip" for WordPress and Shopify site owners.
  - One-click "Send to Developer" quick-copy button formatting a 3-line Markdown note for Slack, email, or Jira tickets.
- "Explain Like I'm 5" (ELI5) jargon explainer cards across all 8 free audit tools:
  - TTFB: "The Drive-Thru Order Window"
  - LCP: "The Front-Page Newspaper Headline"
  - CLS / Images: "The Menu Button Jump"
  - Page Weight: "The Heavy Suitcase Analogy"
  - Broken Links: "The Dead-End Ditch"
  - HTTP Headers: "The Deadbolt Front Door"
  - SEO Meta: "The Book Cover & Storefront Sign"
  - Schema: "The Nutrition Facts Label for Robots"
- Dual actionable fix pathways ("For Site Owners (No-Code)" vs "For Developers (Code Snippets)") on all audit outputs.
- Integration of `PlainEnglishVerdict` across all 9 specialized flagship audit tools (`geo-audit`, `index-trace`, `overflow-trace`, `hydration-audit`, `schema-graph`, `img-spec`, `payload-sniper`, `link-bleed`, `context-silo`) and the fallback performance auditor.

### Changed
- `data/tools.ts`: Rewrote short descriptions and "what it means" definitions across all 17 tools to eliminate technical jargon while maintaining engineering accuracy.

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
