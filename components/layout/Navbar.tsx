'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = ['services', 'process', 'about', 'portfolio', 'contact'] as const

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const otherLocale = locale === 'es' ? 'en' : 'es'

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-brand-deep/95 backdrop-blur-md shadow-lg shadow-brand-deep/20'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center font-sora font-black text-brand-deep text-sm group-hover:bg-brand-ice transition-colors">
            JT
          </div>
          <span className="font-sora font-black text-white text-lg tracking-tight">
            JCF<span className="text-brand-red">T</span>ECH
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="text-white/70 hover:text-white text-sm font-medium transition-colors duration-200"
            >
              {t(key)}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href={`/${otherLocale}`}
            className="text-white/50 hover:text-white text-xs font-medium uppercase tracking-widest transition-colors px-2 py-1 rounded border border-white/10 hover:border-white/30"
          >
            {otherLocale}
          </Link>
          <a
            href="#contact"
            className="bg-brand-red hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
          >
            {t('cta')}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-brand-deep border-t border-white/10 px-4 py-6 flex flex-col gap-4">
          {navLinks.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white text-base font-medium py-2 border-b border-white/5"
            >
              {t(key)}
            </a>
          ))}
          <div className="flex items-center gap-3 pt-2">
            <Link
              href={`/${otherLocale}`}
              className="text-white/50 text-sm uppercase tracking-widest"
            >
              {otherLocale === 'en' ? '🇺🇸 EN' : '🇨🇷 ES'}
            </Link>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="flex-1 text-center bg-brand-red text-white text-sm font-semibold px-4 py-2.5 rounded-lg"
            >
              {t('cta')}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
