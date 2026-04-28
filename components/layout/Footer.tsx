import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <footer className="bg-brand-deep text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center font-sora font-black text-brand-deep text-sm">
                JT
              </div>
              <span className="font-sora font-black text-xl tracking-tight">
                JCF<span className="text-brand-red">T</span>ECH
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              {t('hero.subtitle').slice(0, 90)}...
            </p>
            <div className="mt-4 flex items-center gap-2 text-white/30 text-xs">
              <span>🇨🇷</span>
              <span>{t('about.location')}</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="font-sora font-semibold text-sm uppercase tracking-widest text-white/40 mb-4">
              {locale === 'es' ? 'Navegación' : 'Navigation'}
            </p>
            <ul className="space-y-3">
              {(['services', 'about', 'portfolio', 'contact'] as const).map((key) => (
                <li key={key}>
                  <a
                    href={`#${key}`}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {t(`nav.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sora font-semibold text-sm uppercase tracking-widest text-white/40 mb-4">
              {locale === 'es' ? 'Contacto' : 'Contact'}
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Mail size={14} className="text-brand-red flex-shrink-0" />
                <a href="mailto:info@jcfdev.com" className="hover:text-white transition-colors">
                  info@jcfdev.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Phone size={14} className="text-brand-red flex-shrink-0" />
                <a href="tel:+50689690102" className="hover:text-white transition-colors">
                  +506 8969-0102
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin size={14} className="text-brand-red flex-shrink-0 mt-0.5" />
                <span>Palmares, Alajuela<br />Costa Rica</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-white/30 text-xs">
          <p>© {new Date().getFullYear()} JCF Tech S.R.L. — {t('footer.rights')}</p>
          <p>{t('footer.legal')}</p>
        </div>
      </div>

      {/* Red bottom stripe */}
      <div className="h-1.5 bg-brand-red" />
    </footer>
  )
}
