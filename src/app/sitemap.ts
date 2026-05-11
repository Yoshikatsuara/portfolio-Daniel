import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://danielaradamasceno.com'; // Ou outro domínio em produção

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/styleguide`,
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.1,
    },
  ];
}
