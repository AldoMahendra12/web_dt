import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Ganti dengan domain asli website jika sudah punya (contoh: https://dakwahtulungagung.com)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dakwahtulungagung.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'], // Jangan index endpoint API
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
