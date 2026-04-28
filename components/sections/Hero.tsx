'use client'

import { useTranslations } from 'next-intl'
import { ArrowRight, Shield } from 'lucide-react'
import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

// Deterministic pixel scatter - no randomness on render
const PIXELS = [
  { x: 72, y: 8,  s: 10, o: 0.6,  c: 'bg-brand-tech' },
  { x: 85, y: 5,  s: 7,  o: 0.4,  c: 'bg-brand-red' },
  { x: 90, y: 14, s: 5,  o: 0.3,  c: 'bg-brand-tech' },
  { x: 78, y: 20, s: 8,  o: 0.5,  c: 'bg-white' },
  { x: 94, y: 22, s: 6,  o: 0.25, c: 'bg-brand-red' },
  { x: 68, y: 30, s: 4,  o: 0.2,  c: 'bg-brand-tech' },
  { x: 88, y: 32, s: 9,  o: 0.35, c: 'bg-white' },
  { x: 96, y: 10, s: 5,  o: 0.3,  c: 'bg-brand-tech' },
  { x: 75, y: 42, s: 6,  o: 0.15, c: 'bg-brand-red' },
  { x: 92, y: 40, s: 4,  o: 0.2,  c: 'bg-white' },
  { x: 82, y: 48, s: 7,  o: 0.12, c: 'bg-brand-tech' },
  { x: 98, y: 35, s: 5,  o: 0.18, c: 'bg-brand-red' },
]

export default function Hero() {
  const t = useTranslations('hero')

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-brand-deep flex items-center overflow-hidden"
    >
      {/* Diagonal split */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #0A1F5C 60%, #185FA5 100%)',
        }}
      />

      {/* Pixel scatter */}
      <div className="absolute inset-0 pointer-events-none">
        {PIXELS.map((p, i) => (
          <div
            key={i}
            className={`absolute rounded-sm ${p.c}`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.s,
              height: p.s,
              opacity: p.o,
            }}
          />
        ))}
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Red bottom stripe */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-red" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        <div className="max-w-3xl">

          {/* Tag */}
          <motion.div {...fadeUp(0.1)} className="flex items-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
              {t('tag')}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.2)}
            className="font-sora font-black text-white text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight mb-6"
          >
            {t('title')}{' '}
            <br />
            <span className="text-brand-red">{t('titleAccent')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.35)}
            className="text-white/60 text-lg sm:text-xl leading-relaxed max-w-2xl mb-10"
          >
            {t('subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.45)} className="flex flex-wrap gap-4">
            <a
              href="#services"
              className="inline-flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-100"
            >
              {t('cta')}
              <ArrowRight size={16} />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-6 py-3.5 rounded-xl transition-all duration-200 backdrop-blur-sm"
            >
              {t('ctaSecondary')}
            </a>
          </motion.div>

          {/* Badge */}
          <motion.div {...fadeUp(0.55)} className="mt-12 flex items-center gap-2">
            <Shield size={14} className="text-white/30" />
            <span className="text-white/30 text-xs">
              🇨🇷 {t('badge')}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
      </motion.div>
    </section>
  )
}
