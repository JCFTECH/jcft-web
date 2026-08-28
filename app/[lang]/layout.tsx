import type { Metadata } from 'next'
import { Sora, DM_Sans } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Toaster } from 'sonner'
import StructuredData from '@/components/StructuredData'
import '../globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
})

const dm = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm',
  display: 'swap',
  weight: ['400', '500'],
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const isEs = lang === 'es'

  const title = isEs
    ? 'JCF Tech — Desarrollo de Software y Web en Costa Rica | Palmares, Alajuela'
    : 'JCF Tech — Software Development & Web Design in Costa Rica'

  const description = isEs
    ? 'Empresa costarricense de desarrollo de software a medida, sitios web y automatizaciones. Servimos a pymes y empresas en Palmares, Alajuela y toda Costa Rica. Cédula 3-102-935084.'
    : 'Costa Rican software development company. Custom software, web development and automations for businesses. Based in Palmares, Alajuela, Costa Rica.'

  const keywords = isEs
    ? [
        'desarrollo de software Costa Rica',
        'desarrollo web Costa Rica',
        'software a medida Costa Rica',
        'automatizaciones empresariales Costa Rica',
        'empresa de tecnología Palmares',
        'desarrollo web Alajuela',
        'sistema de gestión Costa Rica',
        'aplicaciones web Costa Rica',
        'JCFTech',
        'JCF Tech',
        'programación Costa Rica',
        'consultoría tecnológica Costa Rica',
      ]
    : [
        'software development Costa Rica',
        'web development Costa Rica',
        'custom software Costa Rica',
        'business automation Costa Rica',
        'tech company Palmares',
        'web design Alajuela',
        'JCFTech',
        'JCF Tech',
      ]

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'JCF Tech S.R.L.', url: 'https://www.jcfdev.com' }],
    creator: 'JCF Tech S.R.L.',
    publisher: 'JCF Tech S.R.L.',
    metadataBase: new URL('https://www.jcfdev.com'),
    alternates: {
      canonical: `https://www.jcfdev.com/${lang}`,
      languages: {
        'es': 'https://www.jcfdev.com/es',
        'en': 'https://www.jcfdev.com/en',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.jcfdev.com/${lang}`,
      siteName: 'JCF Tech',
      locale: isEs ? 'es_CR' : 'en_US',
      alternateLocale: isEs ? 'en_US' : 'es_CR',
      type: 'website',
      images: [
        {
          url: 'https://www.jcfdev.com/og-image.png',
          width: 1200,
          height: 630,
          alt: isEs
            ? 'JCF Tech — Desarrollo de Software en Costa Rica'
            : 'JCF Tech — Software Development in Costa Rica',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://www.jcfdev.com/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const messages = await getMessages()

  return (
    <html lang={lang} className={`${sora.variable} ${dm.variable}`}>
      <head>
        <StructuredData lang={lang} />
      </head>
      <body className="font-dm bg-brand-light text-gray-900 antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
          <Toaster richColors position="bottom-right" />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
