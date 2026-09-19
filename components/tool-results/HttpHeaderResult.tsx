'use client';

import React, { useState } from 'react';
import { HeaderAuditResult } from '@/lib/tool-analyzers/headersAnalyzer';
import PlainEnglishVerdict from '@/components/ui/PlainEnglishVerdict';
import { CheckCircle2, AlertTriangle, AlertCircle, Shield, Search, Server, Zap, Clock, HelpCircle, Wrench } from 'lucide-react';

export default function HttpHeaderResult({ result }: { result: HeaderAuditResult }) {
  const [searchTerm, setSearchTerm] = useState('');

  const isGood = result.securityScore >= 75;
  const isWarning = result.securityScore >= 50 && result.securityScore < 75;
  const impact = isGood ? 'safe' : isWarning ? 'warning' : 'critical';

  const headline = isGood
    ? 'Your server has strong digital security headers in place.'
    : isWarning
    ? 'Missing recommended security headers (like HSTS or CSP).'
    : 'Essential security headers are missing: leaving visitors less protected.';

  const summary =
    'Audited ' +
    result.rawHeaders.length +
    ' server response headers. ' +
    (isGood
      ? 'Your web server successfully enforces HTTPS encryption and prevents clickjacking attempts.'
      : 'Your web server is missing key defensive headers. Adding HSTS and X-Frame-Options will safeguard user sessions and satisfy Google modern web standards.');

  const businessImpact = isGood
    ? 'Protects your brand reputation and prevents malicious sites from framing your checkout or forms.'
    : 'Without security headers, scammers can display your website inside an invisible iframe to steal user clicks (clickjacking) or downgrade HTTPS connections.';

  const topFix =
    result.recommendations[0] ||
    'Enable Strict-Transport-Security (HSTS) and X-Content-Type-Options: nosniff via Cloudflare or web server config.';

  const filteredHeaders = result.rawHeaders.filter(
    (h) =>
      h.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 1. Plain English Human Verdict */}
      <PlainEnglishVerdict
        toolName="HTTP Header Checker"
        targetDomain={result.domain}
        impact={impact}
        headline={headline}
        summary={summary}
        businessImpact={businessImpact}
        topFix={topFix}
        noCodeTip="If your site runs through Cloudflare (free), go to SSL/TLS > Edge Certificates and enable 'HTTP Strict Transport Security (HSTS)' with one toggle."
      />

      {/* 2. Top Summary Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5E7EB]">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] block mb-1">
            HTTP Header Target
          </span>
          <div className="font-mono text-base font-bold text-[#0F0F0F] break-all">
            {result.domain}
          </div>
          <div className="text-xs text-[#6B7280] mt-1 font-mono">
            HTTP Status: <span className="font-bold text-[#10B981]">{result.statusCode} OK</span> | Protocol: {result.protocol}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-white border border-[#E5E7EB] text-right">
            <span className="text-[10px] uppercase font-semibold text-[#6B7280] block">Security Score</span>
            <span className="text-2xl font-bold font-mono text-[#0F0F0F]">
              {result.securityScore}<span className="text-xs font-normal text-[#6B7280]">/100</span>
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
            <Shield className="h-4 w-4 flex-shrink-0" />
            <span>Grade {result.securityGrade}</span>
          </div>
        </div>
      </div>

      {/* ELI5 Jargon Explainer Box */}
      <div className="p-4 rounded-lg bg-[#F8F8F8] border border-[#E5E7EB] text-xs text-[#4B5563] space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-[#0F0F0F]">
          <HelpCircle className="h-3.5 w-3.5 text-[#2563EB]" />
          <span>Explain Like I am 5: What are HTTP Security Headers?</span>
        </div>
        <p className="leading-relaxed">
          Think of security headers as digital locks and alarms on your website. When a visitor's browser connects, these headers say: "Always encrypt our conversation, never let another website embed our pages inside an invisible trap, and block malicious code from running."
        </p>
      </div>

      {/* Security Headers Scorecard */}
      <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#0F0F0F] flex items-center gap-2">
          <Shield className="h-4 w-4 text-[#2563EB]" />
          <span>Security Headers Scorecard:</span>
        </div>

        <div className="divide-y divide-[#E5E7EB]">
          {result.securityHeaders.map((sh, idx) => (
            <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-[#0F0F0F] block font-mono">{sh.header}</span>
                {sh.value && (
                  <code className="text-[11px] text-[#4B5563] bg-[#F8F8F8] px-2 py-0.5 rounded border border-[#E5E7EB] break-all block">
                    {sh.value}
                  </code>
                )}
                <span className="text-[#6B7280] text-[11px] block">{sh.recommendation}</span>
              </div>
              <span
                className={`px-2.5 py-1 rounded text-[10px] font-bold flex-shrink-0 self-start ${
                  sh.status === 'PASS'
                    ? 'bg-[#10B981]/15 text-[#059669]'
                    : sh.status === 'WARNING'
                    ? 'bg-[#F59E0B]/15 text-[#B45309]'
                    : 'bg-[#EF4444]/15 text-[#DC2626]'
                }`}
              >
                {sh.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Caching & Infrastructure Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-4 rounded-lg bg-white border border-[#E5E7EB] space-y-2">
          <div className="flex items-center gap-2 font-bold text-[#0F0F0F] text-xs uppercase tracking-wider">
            <Clock className="h-4 w-4 text-[#2563EB]" />
            <span>Caching Policy</span>
          </div>
          <div className="bg-[#F8F8F8] p-2.5 rounded border border-[#E5E7EB] font-mono text-[11px] text-[#4B5563] break-all">
            {result.cachingPolicy.cacheControl || 'No Cache-Control header found.'}
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] pt-1">
            <span className={result.cachingPolicy.cacheControl ? 'text-[#059669]' : 'text-[#B45309]'}>
              {result.cachingPolicy.cacheControl ? '✓ Cache-Control set' : '✗ No Cache-Control'}
            </span>
            <span className={result.cachingPolicy.hasEtag ? 'text-[#059669]' : 'text-[#6B7280]'}>
              {result.cachingPolicy.hasEtag ? '✓ ETag supported' : '- No ETag'}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#E5E7EB] space-y-2">
          <div className="flex items-center gap-2 font-bold text-[#0F0F0F] text-xs uppercase tracking-wider">
            <Server className="h-4 w-4 text-[#2563EB]" />
            <span>Server & Infrastructure</span>
          </div>
          <div className="bg-[#F8F8F8] p-2.5 rounded border border-[#E5E7EB] text-[11px] text-[#4B5563] space-y-1 font-mono">
            <div>Server Software: {result.serverSignatures.server || 'Hidden (Good)'}</div>
            <div>Edge CDN: {result.serverSignatures.cdnDetected || 'None Detected'}</div>
          </div>
        </div>
      </div>

      {/* Raw Headers Table with Filter */}
      <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-[#6B7280]" />
            <h3 className="text-sm font-bold text-[#0F0F0F] uppercase tracking-wide">
              Complete Header List ({result.rawHeaders.length})
            </h3>
          </div>
          <input
            type="text"
            placeholder="Search headers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-lg border border-[#E5E7EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB] w-full sm:w-64"
          />
        </div>

        <div className="overflow-x-auto border border-[#E5E7EB] rounded-lg">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#F9FAFB] text-[#6B7280] uppercase tracking-wider text-[10px] border-b border-[#E5E7EB]">
              <tr>
                <th className="p-3">Header</th>
                <th className="p-3">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredHeaders.map((h, idx) => (
                <tr key={idx} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="p-3 font-semibold text-[#0F0F0F] whitespace-nowrap align-top">{h.key}</td>
                  <td className="p-3 text-[#4B5563] break-all">{h.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dual Guidance: How to Fix */}
      <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-4">
        <div className="flex items-center gap-2">
          <Wrench className="h-4 w-4 text-[#2563EB]" />
          <h3 className="text-sm font-bold text-[#0F0F0F] uppercase tracking-wide">
            How to Add Security Headers
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
                <span><strong>Cloudflare:</strong> Enable "Automatic HTTPS Rewrites" and "HSTS" under SSL/TLS settings with one click.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB] mt-1.5 flex-shrink-0" />
                <span><strong>WordPress:</strong> Plugins like Wordfence or Really Simple SSL have a 1-click toggle to insert modern security headers.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] space-y-2">
            <span className="font-bold text-[#0F0F0F] text-xs uppercase tracking-wider block text-[#0F0F0F]">
              For Developers:
            </span>
            <div className="p-2.5 rounded bg-[#111827] text-white/90 font-mono text-[10px] space-y-1 overflow-x-auto">
              <div>add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;</div>
              <div>add_header X-Content-Type-Options "nosniff" always;</div>
              <div>add_header X-Frame-Options "SAMEORIGIN" always;</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
