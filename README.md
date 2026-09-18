# WebAudits.pro

Next.js 14 Technical Performance Intelligence & Technical SEO Platform

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red.svg)](#)

WebAudits.pro is an independent web performance and technical search intelligence platform. It provides automated in-browser diagnostics, Core Web Vitals benchmarks, and specialized search crawler auditing tools for engineering teams and digital agencies.

Live platform: [https://webaudits.pro](https://webaudits.pro)

---

## Architecture Overview

The site is built on Next.js 14 using the App Router with hybrid static generation and targeted serverless API routes:
- 105 statically pre-rendered routes achieving zero layout shift (0.000 CLS) and sub-2.5s mobile Largest Contentful Paint.
- 141 validated Schema.org JSON-LD structured data instances spanning BreadcrumbList, TechArticle, FAQPage, SoftwareApplication, WebApplication, and Dataset graphs.
- Edge-optimized CSS architecture using Tailwind CSS and fluid type scales, preventing render-blocking layout recalculations.
- Serverless diagnostic endpoints for live Core Web Vitals analysis, AI search bot governance, and HTTP redirect tracing.

---

## Interactive Diagnostic Tools

The platform hosts five free diagnostic engines:

1. DOM Hydration & SSR Parity Engine (`/tools/hydration-audit`): compares raw server-rendered HTML against hydrated client DOM trees to identify dropped Schema.org markup, missing links, and dynamic noindex tags.
2. GEO Citability & AI Crawler Auditor (`/tools/geo-audit`): scores content citability for Google AI Overviews, ChatGPT Search, and Perplexity AI using Princeton KDD 2024 empirical formulas while auditing robots.txt access for search bots.
3. GSC Indexing Triage & Crawler Tracer (`/tools/index-trace`): traces hop-by-hop HTTP redirect chains, evaluates line-by-line RFC 9309 robots.txt collisions, and diagnoses soft-404 patterns on HTTP 200 responses.
4. Website Speed Test (`/tools/website-speed-test`): measures raw server Time to First Byte (TTFB), asset payloads, and mobile Core Web Vitals directly in the browser.
5. LCP Element Finder (`/tools/lcp-checker`): isolates the specific image asset or text node triggering Largest Contentful Paint in mobile viewports.

---

## Project Structure

```text
vitalssniper_web/
├── app/
│   ├── api/
│   │   ├── audit/          # Core Web Vitals analysis endpoint
│   │   ├── geo/            # GEO citability scoring endpoint
│   │   └── trace/          # IndexTrace HTTP & robots endpoint
│   ├── articles/           # Technical SEO and speed guides
│   ├── comparisons/        # Data-backed hosting and plugin benchmarks
│   ├── research/           # Empirical web performance studies
│   ├── reviews/            # CMS and infrastructure reviews
│   └── tools/              # Dynamic interactive tool pages
├── components/             # Reusable UI components
├── data/                   # Static databases and tool definitions
├── scripts/                # IndexNow submission and utility scripts
└── tests/                  # Schema.org JSON-LD and Playwright E2E tests
```

---

## Development & Build

### Prerequisites
Node.js 18+ and npm.

### Installation
```bash
npm install
```

### Local Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Schema Validation Test
Validates all 141 Schema.org JSON-LD blocks across pre-rendered static output:
```bash
npm run test:schemas
```

---

## Design System Invariants

The platform adheres to strict typography, color, and accessibility constraints:
- Background: `#F7F4EE`
- Surface: `#FFFFFF`
- Primary text: `#20201E`
- Muted text: `#716C64`
- Border: `#DDD7CE`
- Accent: `#B76345`
- Dark surface: `#242321`
- Reading column: 680px to 780px
- Punctuation: standard hyphens (-) or colons (:) only. Zero em-dashes or en-dashes across all copy.

---

## Author & Engineering Attribution

Architected and maintained by **Sadikeen Firoz** ([@xcalibur73](https://github.com/xcalibur73)).
