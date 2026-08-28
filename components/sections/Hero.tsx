'use client'

import { useTranslations } from 'next-intl'
import { ArrowRight, Shield, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

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
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, #0A1F5C 55%, #0f2d6e 100%)' }}
      />

      {/* Pixel scatter */}
      <div className="absolute inset-0 pointer-events-none">
        {PIXELS.map((p, i) => (
          <div
            key={i}
            className={`absolute rounded-sm ${p.c}`}
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, opacity: p.o }}
          />
        ))}
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Red bottom stripe */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-red" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <div>
            {/* Tag */}
            <motion.div {...fadeUp(0.1)} className="mb-8">
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                {t('tag')}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp(0.2)}
              className="font-sora font-black text-white text-5xl sm:text-6xl leading-[1.05] tracking-tight mb-6"
            >
              {t('title')}
              <br />
              <span className="text-brand-red">{t('titleAccent')}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              {...fadeUp(0.35)}
              className="text-white/60 text-lg leading-relaxed mb-10 max-w-xl"
            >
              {t('subtitle')}
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.45)} className="flex flex-wrap gap-4 mb-12">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-100"
              >
                {t('cta')}
                <ArrowRight size={16} />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-6 py-3.5 rounded-xl transition-all duration-200"
              >
                {t('ctaSecondary')}
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div {...fadeUp(0.55)} className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Shield size={13} className="text-white/30" />
                <span className="text-white/30 text-xs">🇨🇷 {t('badge')}</span>
              </div>
              <div className="w-px h-4 bg-white/10 self-center" />
              <span className="text-white/30 text-xs">{t('badgeDelivery')}</span>
              <div className="w-px h-4 bg-white/10 self-center" />
              <span className="text-white/30 text-xs">{t('badgeProcess')}</span>
            </motion.div>
          </div>

          {/* Right — value props */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:flex flex-col gap-4"
          >
            {[
              { num: '01', title: t('prop1Title'), desc: t('prop1Desc') },
              { num: '02', title: t('prop2Title'), desc: t('prop2Desc') },
              { num: '03', title: t('prop3Title'), desc: t('prop3Desc') },
            ].map((p) => (
              <div
                key={p.num}
                className="flex gap-5 bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition-colors"
              >
                <span className="font-sora font-black text-brand-red text-2xl min-w-[36px]">
                  {p.num}
                </span>
                <div>
                  <p className="font-sora font-bold text-white text-base mb-1">{p.title}</p>
                  <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <ChevronDown size={18} className="text-white/20 animate-bounce" />
      </motion.div>
    </section>
  )
}
