'use client';

import React, { useState } from 'react';
import { ImageSizeAuditResult } from '@/lib/tool-analyzers/imageAnalyzer';
import { CheckCircle2, AlertTriangle, AlertCircle, ImageIcon, ExternalLink } from 'lucide-react';

export default function ImageSizeResult({ result }: { result: ImageSizeAuditResult }) {
  const [filterCls, setFilterCls] = useState(false);
  const [filterAlt, setFilterAlt] = useState(false);

  const isGood = result.score >= 80;
  const isWarning = result.score >= 50 && result.score < 80;

  const displayedImages = result.images.filter((img) => {
    if (filterCls && !img.isClsRisk) return false;
    if (filterAlt && img.hasAlt) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Summary Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5E7EB]">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] block mb-1">
            Image Audit Target
          </span>
          <div className="font-mono text-base font-bold text-[#0F0F0F] break-all">
            {result.domain}
          </div>
          <div className="text-xs text-[#6B7280] mt-1">
            Audited <span className="font-bold text-[#0F0F0F] font-mono">{result.stats.totalImages}</span> inline images: <span className="font-bold text-[#0F0F0F] font-mono">{result.stats.modernFormatPercentage}%</span> modern WebP/AVIF format adoption
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-white border border-[#E5E7EB] text-right">
            <span className="text-[10px] uppercase font-semibold text-[#6B7280] block">Image Score</span>
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
            <span>{result.grade.replace('_', ' ')}</span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-lg bg-white border border-[#E5E7EB]">
          <span className="text-[10px] uppercase font-semibold text-[#6B7280] block mb-1">Modern Formats</span>
          <span className="text-xl font-mono font-bold text-[#0F0F0F]">
            {result.stats.modernFormatCount} <span className="text-xs font-normal text-[#6B7280]">({result.stats.modernFormatPercentage}%)</span>
          </span>
        </div>
        <div className="p-3.5 rounded-lg bg-white border border-[#E5E7EB]">
          <span className="text-[10px] uppercase font-semibold text-[#6B7280] block mb-1">Legacy JPG / PNG</span>
          <span className={`text-xl font-mono font-bold ${result.stats.legacyFormatCount > 0 ? 'text-[#F59E0B]' : 'text-[#059669]'}`}>
            {result.stats.legacyFormatCount}
          </span>
        </div>
        <div className="p-3.5 rounded-lg bg-white border border-[#E5E7EB]">
          <span className="text-[10px] uppercase font-semibold text-[#6B7280] block mb-1">CLS Risk (No W/H)</span>
          <span className={`text-xl font-mono font-bold ${result.stats.missingDimensionsCount > 0 ? 'text-[#DC2626]' : 'text-[#059669]'}`}>
            {result.stats.missingDimensionsCount}
          </span>
        </div>
        <div className="p-3.5 rounded-lg bg-white border border-[#E5E7EB]">
          <span className="text-[10px] uppercase font-semibold text-[#6B7280] block mb-1">Missing Alt Text</span>
          <span className={`text-xl font-mono font-bold ${result.stats.missingAltCount > 0 ? 'text-[#DC2626]' : 'text-[#059669]'}`}>
            {result.stats.missingAltCount}
          </span>
        </div>
      </div>

      {/* Format Distribution Chips */}
      <div className="p-4 rounded-lg bg-white border border-[#E5E7EB] space-y-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] block">
          Format Distribution
        </span>
        <div className="flex flex-wrap gap-2 pt-1">
          {result.formatDistribution.map((item, idx) => (
            <span
              key={idx}
              className={`px-2.5 py-1 rounded text-xs font-mono font-bold border ${
                ['WEBP', 'AVIF', 'SVG'].includes(item.format)
                  ? 'bg-[#10B981]/10 border-[#10B981]/30 text-[#059669]'
                  : 'bg-[#F59E0B]/10 border-[#F59E0B]/30 text-[#B45309]'
              }`}
            >
              {item.format}: {item.count}
            </span>
          ))}
        </div>
      </div>

      {/* Image Inventory Table */}
      <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-[#2563EB]" />
            <h3 className="text-sm font-bold text-[#0F0F0F] uppercase tracking-wide">
              Image Inventory ({displayedImages.length} shown)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1.5 text-xs text-[#4B5563] cursor-pointer">
              <input
                type="checkbox"
                checked={filterCls}
                onChange={(e) => setFilterCls(e.target.checked)}
                className="rounded border-[#E5E7EB] text-[#2563EB] focus:ring-[#2563EB]"
              />
              <span>CLS Risk Only ({result.stats.missingDimensionsCount})</span>
            </label>
            <label className="flex items-center gap-1.5 text-xs text-[#4B5563] cursor-pointer">
              <input
                type="checkbox"
                checked={filterAlt}
                onChange={(e) => setFilterAlt(e.target.checked)}
                className="rounded border-[#E5E7EB] text-[#2563EB] focus:ring-[#2563EB]"
              />
              <span>Missing Alt Only ({result.stats.missingAltCount})</span>
            </label>
          </div>
        </div>

        {displayedImages.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-[#E5E7EB] rounded-lg">
            <CheckCircle2 className="h-8 w-8 text-[#059669] mx-auto mb-2" />
            <p className="text-xs font-semibold text-[#0F0F0F]">No images match the selected filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-[#E5E7EB] rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F9FAFB] text-[#6B7280] uppercase tracking-wider font-mono text-[10px] border-b border-[#E5E7EB]">
                <tr>
                  <th className="p-3">Format</th>
                  <th className="p-3">Source URL</th>
                  <th className="p-3">Dimensions</th>
                  <th className="p-3">Alt Text</th>
                  <th className="p-3">CLS Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {displayedImages.map((img, idx) => (
                  <tr key={idx} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="p-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                          img.isModernFormat
                            ? 'bg-[#10B981]/15 text-[#059669]'
                            : 'bg-[#F59E0B]/15 text-[#B45309]'
                        }`}
                      >
                        {img.format}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-[11px] text-[#4B5563] max-w-[280px] truncate">
                      <a
                        href={img.src}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-[#2563EB] hover:underline inline-flex items-center gap-1"
                      >
                        {img.src}
                        <ExternalLink className="h-3 w-3 inline flex-shrink-0" />
                      </a>
                    </td>
                    <td className="p-3 font-mono text-[11px] whitespace-nowrap">
                      {img.hasDimensions ? (
                        <span className="text-[#059669]">
                          {img.width}x{img.height}
                        </span>
                      ) : (
                        <span className="text-[#DC2626] font-bold">MISSING</span>
                      )}
                    </td>
                    <td className="p-3 text-[11px] text-[#4B5563] max-w-[200px] truncate">
                      {img.hasAlt ? (
                        <span>{img.altText}</span>
                      ) : (
                        <span className="text-[#DC2626] font-bold font-mono">None</span>
                      )}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      {img.isClsRisk ? (
                        <span className="px-2 py-0.5 rounded bg-[#EF4444]/15 text-[#DC2626] font-bold text-[10px]">
                          Risk: No W/H
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-[#10B981]/15 text-[#059669] font-bold text-[10px]">
                          Safe
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-3">
          <h3 className="text-sm font-bold text-[#0F0F0F] uppercase tracking-wide">
            Image Optimization Recommendations
          </h3>
          <ul className="space-y-2">
            {result.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-[#4B5563]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB] mt-1.5 flex-shrink-0" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
