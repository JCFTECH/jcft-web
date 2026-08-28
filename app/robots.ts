import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://www.jcfdev.com/sitemap.xml',
    host: 'https://www.jcfdev.com',
  }
}
