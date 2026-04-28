import type { Metadata } from 'next'
import { Sora, DM_Sans } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Toaster } from 'sonner'
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

export const metadata: Metadata = {
  title: 'JCF Tech — Innovación Digital · Costa Rica',
  description: 'Desarrollo web, software a medida y automatizaciones para empresas costarricenses y clientes internacionales.',
  keywords: ['desarrollo web', 'software', 'automatizaciones', 'Costa Rica', 'JCFTech'],
  openGraph: {
    title: 'JCF Tech — Innovación Digital',
    description: 'Soluciones digitales que realmente funcionan.',
    url: 'https://jcfdev.com',
    siteName: 'JCF Tech',
    locale: 'es_CR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JCF Tech — Innovación Digital',
    description: 'Soluciones digitales que realmente funcionan.',
  },
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
      <body className="font-dm bg-brand-light text-gray-900 antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
          <Toaster richColors position="bottom-right" />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
