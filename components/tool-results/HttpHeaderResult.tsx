'use client';

import React, { useState } from 'react';
import { HeaderAuditResult } from '@/lib/tool-analyzers/headersAnalyzer';
import { CheckCircle2, AlertTriangle, AlertCircle, Shield, Search, Server, Zap, Clock } from 'lucide-react';

export default function HttpHeaderResult({ result }: { result: HeaderAuditResult }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHeaders = result.rawHeaders.filter(
    (h) =>
      h.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Summary Bar */}
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
              result.securityScore >= 75
                ? 'bg-[#10B981]/15 text-[#059669]'
                : result.securityScore >= 50
                ? 'bg-[#F59E0B]/15 text-[#B45309]'
                : 'bg-[#EF4444]/15 text-[#DC2626]'
            }`}
          >
            <Shield className="h-4 w-4 flex-shrink-0" />
            <span>Grade {result.securityGrade}</span>
          </div>
        </div>
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
            <span className={`px-2 py-0.5 rounded font-semibold ${result.cachingPolicy.hasEtag ? 'bg-[#10B981]/10 text-[#059669]' : 'bg-[#F3F4F6] text-[#6B7280]'}`}>
              ETag: {result.cachingPolicy.hasEtag ? 'Present' : 'Missing'}
            </span>
            <span className={`px-2 py-0.5 rounded font-semibold ${result.cachingPolicy.hasLastModified ? 'bg-[#10B981]/10 text-[#059669]' : 'bg-[#F3F4F6] text-[#6B7280]'}`}>
              Last-Modified: {result.cachingPolicy.hasLastModified ? 'Present' : 'Missing'}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#E5E7EB] space-y-2">
          <div className="flex items-center gap-2 font-bold text-[#0F0F0F] text-xs uppercase tracking-wider">
            <Server className="h-4 w-4 text-[#2563EB]" />
            <span>Server Infrastructure</span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between py-1 border-b border-[#E5E7EB]">
              <span className="text-[#6B7280]">Server Header:</span>
              <span className="font-mono font-semibold text-[#0F0F0F]">{result.serverSignatures.server || 'Hidden'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#E5E7EB]">
              <span className="text-[#6B7280]">Detected CDN:</span>
              <span className="font-semibold text-[#2563EB]">{result.serverSignatures.cdnDetected || 'Origin / Direct'}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#6B7280]">Compression:</span>
              <span className="font-mono font-semibold text-[#10B981]">{result.compression.contentEncoding || 'Uncompressed'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Raw Response Headers Table with Search */}
      <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0F0F0F]">
            Raw Response Headers ({result.rawHeaders.length} total):
          </div>
          <div className="relative">
            <Search className="h-3.5 w-3.5 absolute left-2.5 top-2.5 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Filter headers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs rounded border border-[#E5E7EB] bg-[#F8F8F8] focus:outline-none focus:border-[#2563EB]"
            />
          </div>
        </div>

        <div className="overflow-x-auto max-h-72 overflow-y-auto">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="border-b border-[#E5E7EB] text-[#6B7280] sticky top-0 bg-white">
                <th className="py-2 pr-4 font-semibold w-1/3">Header Name</th>
                <th className="py-2 font-semibold">Header Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredHeaders.map((h, idx) => (
                <tr key={idx} className="hover:bg-[#F9FAFB]">
                  <td className="py-2 pr-4 font-bold text-[#0F0F0F] align-top">{h.key}</td>
                  <td className="py-2 text-[#4B5563] break-all align-top">{h.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0F0F0F]">
            Recommended Header Fixes:
          </div>
          <ul className="space-y-2">
            {result.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4B5563]">
                <CheckCircle2 className="h-4 w-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
