import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/license/'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'Google-Extended',
          'Applebot-Extended',
          'OAI-SearchBot',
          'Bingbot',
        ],
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/license/'],
      },
      {
        userAgent: ['CCBot'],
        disallow: ['/'],
      },
    ],
    sitemap: 'https://www.webaudits.pro/sitemap.xml',
    host: 'https://www.webaudits.pro',
  };
}
