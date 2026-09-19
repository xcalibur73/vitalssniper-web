'use client';

import React from 'react';
import { SpeedAuditResult } from '@/lib/tool-analyzers/speedAnalyzer';
import PlainEnglishVerdict from '@/components/ui/PlainEnglishVerdict';
import { CheckCircle2, AlertTriangle, AlertCircle, Clock, Zap, ExternalLink, HelpCircle, Wrench } from 'lucide-react';

export default function WebsiteSpeedResult({ result }: { result: SpeedAuditResult }) {
  const isGood = result.score >= 80;
  const isWarning = result.score >= 50 && result.score < 80;
  const impact = isGood ? 'safe' : isWarning ? 'warning' : 'critical';

  const headline = isGood
    ? 'Your web hosting responds swiftly with minimal delay.'
    : isWarning
    ? 'Your server takes ' + result.ttfbMs + 'ms to respond: a modest delay before pages load.'
    : 'Your web host is sluggish (' + result.ttfbMs + 'ms response time), holding back page speed.';

  const summary =
    'When a visitor taps your link, your server takes ' +
    result.ttfbMs +
    ' milliseconds to send the first piece of data. ' +
    (result.renderBlockingSummary.totalBlockingAssets > 0
      ? 'Also, ' + result.renderBlockingSummary.totalBlockingAssets + ' code file(s) freeze the screen until they finish downloading.'
      : 'No render-blocking scripts are freezing the screen.');

  const businessImpact = isGood
    ? 'Fast initial response creates an instant first impression and keeps search crawlers happy.'
    : 'If a server takes over 500ms to respond, visitors experience a blank white screen and are prone to closing the tab.';

  const topFix = result.recommendations[0] || 'Turn on page caching and an edge CDN to respond in under 200ms.';

  return (
    <div className="space-y-6">
      {/* 1. Plain English Human Verdict */}
      <PlainEnglishVerdict
        toolName="Website Speed Test"
        targetDomain={result.domain}
        impact={impact}
        headline={headline}
        summary={summary}
        businessImpact={businessImpact}
        topFix={topFix}
        noCodeTip="In WordPress, install a trusted caching plugin like LiteSpeed Cache or WP Rocket. In Shopify, uninstall unused third-party tracking apps from your theme."
      />

      {/* 2. Top Summary Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5E7EB]">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] block mb-1">
            Speed Diagnostic Target
          </span>
          <div className="font-mono text-base font-bold text-[#0F0F0F] break-all">
            {result.domain}
          </div>
          <div className="text-xs text-[#6B7280] mt-1">
            Server TTFB: <span className="font-bold text-[#0F0F0F] font-mono">{result.ttfbMs} ms</span> ({result.ttfbRating}) with <span className="font-bold text-[#0F0F0F] font-mono">{result.docKb} KB</span> raw HTML payload
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-white border border-[#E5E7EB] text-right">
            <span className="text-[10px] uppercase font-semibold text-[#6B7280] block">Speed Score</span>
            <span className="text-2xl font-bold font-mono text-[#0F0F0F]">
              {result.score}<span className="text-xs font-normal text-[#6B7280]">/100</span>
            </span>
          </div>

          <div
            className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 ${
              isGood
                ? 'bg-[#10B981]/15 text-[#059669]'
                : isWarning
                ? 'bg-[#F59E0B]/15 text-[#B45309]'
                : 'bg-[#EF4444]/15 text-[#DC2626]'
            }`}
          >
            {isGood ? (
              <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            ) : isWarning ? (
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
            )}
            <span>{result.grade}</span>
          </div>
        </div>
      </div>

      {/* ELI5 Jargon Explainer Box */}
      <div className="p-4 rounded-lg bg-[#F8F8F8] border border-[#E5E7EB] text-xs text-[#4B5563] space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-[#0F0F0F]">
          <HelpCircle className="h-3.5 w-3.5 text-[#2563EB]" />
          <span>Explain Like I am 5: What is Server TTFB and Render-Blocking?</span>
        </div>
        <p className="leading-relaxed">
          Imagine ordering coffee at a drive-thru. <strong>TTFB</strong> is the delay between you speaking and the cashier answering you. <strong>Render-blocking</strong> is like when they make you wait in line while they restock napkins before they give you your cup: visitors stare at a blank screen until those files finish loading.
        </p>
      </div>

      {/* Speed Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-lg bg-white border border-[#E5E7EB]">
          <span className="text-[10px] uppercase font-semibold text-[#6B7280] block mb-1">Server TTFB</span>
          <span
            className={`text-xl font-mono font-bold ${
              result.ttfbRating === 'OPTIMAL'
                ? 'text-[#059669]'
                : result.ttfbRating === 'MODERATE'
                ? 'text-[#B45309]'
                : 'text-[#DC2626]'
            }`}
          >
            {result.ttfbMs} ms
          </span>
          <span className="text-[10px] text-[#6B7280] block mt-0.5">Goal: &lt; 200 ms</span>
        </div>
        <div className="p-3.5 rounded-lg bg-white border border-[#E5E7EB]">
          <span className="text-[10px] uppercase font-semibold text-[#6B7280] block mb-1">Compression</span>
          <span className="text-xl font-mono font-bold text-[#0F0F0F]">
            {result.compression.isCompressed ? (
              <span className="text-[#059669] text-base font-bold uppercase">
                {result.compression.encoding || 'GZIP'}
              </span>
            ) : (
              <span className="text-[#DC2626] text-base font-bold uppercase">NONE</span>
            )}
          </span>
          <span className="text-[10px] text-[#6B7280] block mt-0.5">Shrinks HTML size</span>
        </div>
        <div className="p-3.5 rounded-lg bg-white border border-[#E5E7EB]">
          <span className="text-[10px] uppercase font-semibold text-[#6B7280] block mb-1">Blocking Files</span>
          <span
            className={`text-xl font-mono font-bold ${
              result.renderBlockingSummary.totalBlockingAssets > 0 ? 'text-[#DC2626]' : 'text-[#059669]'
            }`}
          >
            {result.renderBlockingSummary.totalBlockingAssets}
          </span>
          <span className="text-[10px] text-[#6B7280] block mt-0.5">Pause screen render</span>
        </div>
        <div className="p-3.5 rounded-lg bg-white border border-[#E5E7EB]">
          <span className="text-[10px] uppercase font-semibold text-[#6B7280] block mb-1">Page Complexity</span>
          <span className="text-xl font-mono font-bold text-[#0F0F0F]">
            {result.totalElements}
          </span>
          <span className="text-[10px] text-[#6B7280] block mt-0.5">Total HTML tags</span>
        </div>
      </div>

      {/* Latency Breakdown Bar */}
      <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-3">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-[#2563EB]" />
          <h3 className="text-sm font-bold text-[#0F0F0F] uppercase tracking-wide">
            Where Does the Time Go? (Latency Waterfall)
          </h3>
        </div>
        <div className="space-y-2 pt-1">
          {result.latencyBreakdown.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[#0F0F0F]">{item.phase}</span>
                <span className="font-mono font-bold text-[#4B5563]">{item.durationMs} ms</span>
              </div>
              <div className="w-full bg-[#E5E7EB] h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    item.status === 'PASS'
                      ? 'bg-[#10B981]'
                      : item.status === 'WARNING'
                      ? 'bg-[#F59E0B]'
                      : 'bg-[#EF4444]'
                  }`}
                  style={{
                    width: `${Math.min(
                      Math.max((item.durationMs / Math.max(result.ttfbMs, 100)) * 100, 5),
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Render-Blocking Assets List */}
      <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-[#F59E0B]" />
            <h3 className="text-sm font-bold text-[#0F0F0F] uppercase tracking-wide">
              Files Pausing the Screen ({result.renderBlockingSummary.totalBlockingAssets})
            </h3>
          </div>
          <span className="text-xs text-[#6B7280]">
            {result.renderBlockingSummary.blockingScriptsCount} scripts, {result.renderBlockingSummary.blockingStylesCount} stylesheets
          </span>
        </div>

        {result.renderBlockingSummary.assets.length === 0 ? (
          <div className="p-6 text-center border border-dashed border-[#E5E7EB] rounded-lg">
            <CheckCircle2 className="h-6 w-6 text-[#059669] mx-auto mb-2" />
            <p className="text-xs font-semibold text-[#0F0F0F]">
              Zero render-blocking scripts or unoptimized stylesheets detected in the document head.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-[#E5E7EB] rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F9FAFB] text-[#6B7280] uppercase tracking-wider font-mono text-[10px] border-b border-[#E5E7EB]">
                <tr>
                  <th className="p-3">Type</th>
                  <th className="p-3">Asset URL</th>
                  <th className="p-3">Simple Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {result.renderBlockingSummary.assets.map((asset, idx) => (
                  <tr key={idx} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="p-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded font-mono uppercase text-[10px] font-bold ${
                          asset.type === 'script'
                            ? 'bg-[#F59E0B]/15 text-[#B45309]'
                            : 'bg-[#8B5CF6]/15 text-[#7C3AED]'
                        }`}
                      >
                        {asset.type}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-[11px] text-[#4B5563] max-w-[320px] truncate">
                      <a
                        href={asset.url}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-[#2563EB] hover:underline inline-flex items-center gap-1"
                      >
                        {asset.url}
                        <ExternalLink className="h-3 w-3 inline flex-shrink-0" />
                      </a>
                    </td>
                    <td className="p-3 text-[11px] text-[#4B5563]">
                      <span className="font-mono bg-[#F3F4F6] px-1.5 py-0.5 rounded text-[#0F0F0F]">
                        {asset.suggestedFix}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Dual Remediation Guidance */}
      <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-4">
        <div className="flex items-center gap-2">
          <Wrench className="h-4 w-4 text-[#2563EB]" />
          <h3 className="text-sm font-bold text-[#0F0F0F] uppercase tracking-wide">
            How to Accelerate This Page
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] space-y-2">
            <span className="font-bold text-[#0F0F0F] text-xs uppercase tracking-wider block text-[#2563EB]">
              For Site Owners (No Code):
            </span>
            <ul className="space-y-2 text-[#4B5563]">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB] mt-1.5 flex-shrink-0" />
                <span><strong>Activate Page Caching:</strong> Ensure page caching is enabled in your web host (e.g. Cloudways, SiteGround, Kinsta) or caching plugin so pages do not require fresh database queries every time.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB] mt-1.5 flex-shrink-0" />
                <span><strong>Use a Free CDN:</strong> Connect Cloudflare (free) to cache your HTML pages at servers closest to your visitors.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] space-y-2">
            <span className="font-bold text-[#0F0F0F] text-xs uppercase tracking-wider block text-[#0F0F0F]">
              For Developers:
            </span>
            <ul className="space-y-2 text-[#4B5563]">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0F0F0F] mt-1.5 flex-shrink-0" />
                <span>Add <code>defer</code> or <code>async</code> to head scripts: <code>{`<script src="app.js" defer></script>`}</code></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0F0F0F] mt-1.5 flex-shrink-0" />
                <span>Ensure gzip/brotli compression is enabled on the web server (Nginx <code>gzip on;</code> or Apache <code>mod_deflate</code>).</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
