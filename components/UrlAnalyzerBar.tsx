'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Globe, ShieldAlert } from 'lucide-react';

interface UrlAnalyzerBarProps {
  placeholder?: string;
  buttonText?: string;
  className?: string;
}

export default function UrlAnalyzerBar({
  placeholder = 'Enter a website URL (e.g. example.com)',
  buttonText = 'Analyze',
  className = '',
}: UrlAnalyzerBarProps) {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmed = url.trim();
    if (!trimmed) {
      setError('Please enter a website URL to analyze.');
      return;
    }

    let targetUrl = trimmed;
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl;
    }

    try {
      new URL(targetUrl);
    } catch {
      setError('Please enter a valid website address.');
      return;
    }

    setLoading(true);
    // Route to interactive speed test tool with query param
    router.push(`/tools/website-speed-test?url=${encodeURIComponent(targetUrl)}`);
  };

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col sm:flex-row items-stretch gap-2 p-1.5 rounded-2xl bg-white border border-sand-300 shadow-sm focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 transition-all"
      >
        <div className="flex-1 flex items-center gap-3 px-3 py-2">
          <Globe className="h-5 w-5 text-muted flex-shrink-0" />
          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (error) setError('');
            }}
            placeholder={placeholder}
            className="w-full bg-transparent text-sm text-charcoal placeholder-muted focus:outline-none"
            aria-label="Website URL to audit"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-accent-dark transition-all disabled:opacity-75 flex-shrink-0"
        >
          {loading ? (
            <span>Inspecting...</span>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              <span>{buttonText}</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="mt-2 flex items-center gap-1.5 text-xs text-rose-600 px-3">
          <ShieldAlert className="h-3.5 w-3.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-charcoal-muted">
        <span>Instant 50ms Forensics</span>
        <span>&bull;</span>
        <span>Zero Software Installation</span>
        <span>&bull;</span>
        <span>Free Diagnostic Check</span>
      </div>
    </div>
  );
}
