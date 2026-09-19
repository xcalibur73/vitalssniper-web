'use client';

import React, { useState } from 'react';
import { ImageSizeAuditResult } from '@/lib/tool-analyzers/imageAnalyzer';
import PlainEnglishVerdict from '@/components/ui/PlainEnglishVerdict';
import { CheckCircle2, AlertTriangle, AlertCircle, ImageIcon, ExternalLink, HelpCircle, Wrench } from 'lucide-react';

export default function ImageSizeResult({ result }: { result: ImageSizeAuditResult }) {
  const [filterCls, setFilterCls] = useState(false);
  const [filterAlt, setFilterAlt] = useState(false);

  const isGood = result.score >= 80;
  const isWarning = result.score >= 50 && result.score < 80;
  const impact = isGood ? 'safe' : isWarning ? 'warning' : 'critical';

  const headline = isGood
    ? 'Your images are well-optimized with modern formats.'
    : result.stats.missingDimensionsCount > 0
    ? 'Images are causing layout jumps on mobile screens (missing width/height).'
    : 'Your images could load faster with modern WebP compression.';

  const summary =
    'Audited ' +
    result.stats.totalImages +
    ' image(s). ' +
    result.stats.modernFormatPercentage +
    '% use next-gen WebP or AVIF formats. ' +
    (result.stats.missingDimensionsCount > 0
      ? result.stats.missingDimensionsCount + ' image(s) are missing width and height, causing layout jumping. '
      : 'All images lock layout geometry safely. ') +
    (result.stats.missingAltCount > 0
      ? result.stats.missingAltCount + ' image(s) lack alt text for accessibility and image search.'
      : '');

  const businessImpact = isGood
    ? 'Smooth visual loading with zero layout jumping or wasted mobile data.'
    : 'When images load without dimensions, text abruptly jumps down the screen, tricking visitors into misclicking buttons and driving them away.';

  const topFix =
    result.stats.missingDimensionsCount > 0
      ? 'Add width and height attributes to your images to stop the screen from jumping.'
      : result.stats.legacyFormatCount > 0
      ? 'Convert legacy PNG/JPG images to WebP to save up to 70% file size.'
      : result.recommendations[0] || 'Provide descriptive alt text for all content images.';

  const displayedImages = result.images.filter((img) => {
    if (filterCls && !img.isClsRisk) return false;
    if (filterAlt && img.hasAlt) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* 1. Plain English Human Verdict */}
      <PlainEnglishVerdict
        toolName="Image Size Analyzer"
        targetDomain={result.domain}
        impact={impact}
        headline={headline}
        summary={summary}
        businessImpact={businessImpact}
        topFix={topFix}
        noCodeTip="In WordPress, fill in the 'Alt Text' box for every photo in your Media Library, and turn on WebP image generation in plugins like Smush, Imagify, or LiteSpeed."
      />

      {/* 2. Top Summary Bar */}
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

      {/* ELI5 Jargon Explainer Box */}
      <div className="p-4 rounded-lg bg-[#F8F8F8] border border-[#E5E7EB] text-xs text-[#4B5563] space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-[#0F0F0F]">
          <HelpCircle className="h-3.5 w-3.5 text-[#2563EB]" />
          <span>Explain Like I am 5: Why do missing dimensions make pages jump?</span>
        </div>
        <p className="leading-relaxed">
          Have you ever tried tapping a button on your phone, but right before your finger landed, a photo finally loaded and pushed the button down, making you tap the wrong thing? That annoying screen-jump is called <strong>Cumulative Layout Shift (CLS)</strong>. Giving images an explicit width and height tells the browser to reserve the exact space before the image even finishes downloading.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-lg bg-white border border-[#E5E7EB]">
          <span className="text-[10px] uppercase font-semibold text-[#6B7280] block mb-1">Modern Formats</span>
          <span className="text-xl font-mono font-bold text-[#0F0F0F]">
            {result.stats.modernFormatCount} <span className="text-xs font-normal text-[#6B7280]">({result.stats.modernFormatPercentage}%)</span>
          </span>
          <span className="text-[10px] text-[#6B7280] block mt-0.5">WebP / AVIF</span>
        </div>
        <div className="p-3.5 rounded-lg bg-white border border-[#E5E7EB]">
          <span className="text-[10px] uppercase font-semibold text-[#6B7280] block mb-1">Legacy JPG / PNG</span>
          <span className={`text-xl font-mono font-bold ${result.stats.legacyFormatCount > 0 ? 'text-[#F59E0B]' : 'text-[#059669]'}`}>
            {result.stats.legacyFormatCount}
          </span>
          <span className="text-[10px] text-[#6B7280] block mt-0.5">Uncompressed</span>
        </div>
        <div className="p-3.5 rounded-lg bg-white border border-[#E5E7EB]">
          <span className="text-[10px] uppercase font-semibold text-[#6B7280] block mb-1">Layout Shift Risks</span>
          <span className={`text-xl font-mono font-bold ${result.stats.missingDimensionsCount > 0 ? 'text-[#DC2626]' : 'text-[#059669]'}`}>
            {result.stats.missingDimensionsCount}
          </span>
          <span className="text-[10px] text-[#6B7280] block mt-0.5">Missing Width/Height</span>
        </div>
        <div className="p-3.5 rounded-lg bg-white border border-[#E5E7EB]">
          <span className="text-[10px] uppercase font-semibold text-[#6B7280] block mb-1">Missing Alt Text</span>
          <span className={`text-xl font-mono font-bold ${result.stats.missingAltCount > 0 ? 'text-[#DC2626]' : 'text-[#059669]'}`}>
            {result.stats.missingAltCount}
          </span>
          <span className="text-[10px] text-[#6B7280] block mt-0.5">Google Image SEO</span>
        </div>
      </div>

      {/* Format Distribution Chips */}
      <div className="p-4 rounded-lg bg-white border border-[#E5E7EB] space-y-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] block">
          Image Formats Detected
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
              <span>Layout Shift Risk ({result.stats.missingDimensionsCount})</span>
            </label>
            <label className="flex items-center gap-1.5 text-xs text-[#4B5563] cursor-pointer">
              <input
                type="checkbox"
                checked={filterAlt}
                onChange={(e) => setFilterAlt(e.target.checked)}
                className="rounded border-[#E5E7EB] text-[#2563EB] focus:ring-[#2563EB]"
              />
              <span>Missing Alt Text ({result.stats.missingAltCount})</span>
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

      {/* Dual Guidance: How to Fix */}
      <div className="p-5 rounded-lg bg-white border border-[#E5E7EB] space-y-4">
        <div className="flex items-center gap-2">
          <Wrench className="h-4 w-4 text-[#2563EB]" />
          <h3 className="text-sm font-bold text-[#0F0F0F] uppercase tracking-wide">
            How to Optimize Your Images
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
                <span><strong>Always add Alt Text:</strong> In your CMS (WordPress/Shopify), describe what is in the photo for visually impaired users and Google Image search.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB] mt-1.5 flex-shrink-0" />
                <span><strong>Use Native Image Blocks:</strong> Avoid putting images inside raw custom HTML widgets that lack width and height settings.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] space-y-2">
            <span className="font-bold text-[#0F0F0F] text-xs uppercase tracking-wider block text-[#0F0F0F]">
              For Developers:
            </span>
            <p className="text-[#4B5563]">
              Always declare explicit <code>width="..."</code> and <code>height="..."</code> on all <code>{`<img>`}</code> tags or set an explicit CSS <code>aspect-ratio: 16 / 9;</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
