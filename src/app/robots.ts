import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://danielaradamasceno.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/styleguide', // Styleguide não deve ser indexado
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
