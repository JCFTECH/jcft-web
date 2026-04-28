'use client'

import { useTranslations } from 'next-intl'
import { MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import SectionTag from '@/components/ui/SectionTag'

const stats = [
  { key: 'stat1', value: '10+' },
  { key: 'stat2', value: '5+' },
  { key: 'stat3', value: '100%' },
]

export default function About() {
  const t = useTranslations('about')

  return (
    <section id="about" className="section-pad bg-brand-deep pixel-bg overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <SectionTag light>{t('tag')}</SectionTag>
            <h2 className="font-sora font-black text-white text-4xl sm:text-5xl mt-4 mb-4 leading-tight">
              {t('title')}
            </h2>
            <p className="text-brand-red font-medium text-lg mb-6">{t('subtitle')}</p>
            <p className="text-white/60 leading-relaxed mb-4">{t('body')}</p>
            <p className="text-white/60 leading-relaxed mb-8">{t('body2')}</p>
            <div className="flex items-center gap-2 text-white/30 text-sm">
              <MapPin size={14} className="text-brand-red" />
              {t('location')}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="grid grid-cols-1 gap-5"
          >
            {stats.map(({ key, value }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-6 bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors"
              >
                <span className="font-sora font-black text-brand-red text-4xl min-w-[80px]">
                  {value}
                </span>
                <span className="text-white/70 font-medium">{t(key)}</span>
              </motion.div>
            ))}

            {/* Logo mark */}
            <div className="flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl p-6 mt-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-sora font-black text-brand-deep text-base">
                  JT
                </div>
                <div>
                  <p className="font-sora font-black text-white text-xl">
                    JCF<span className="text-brand-red">T</span>ECH
                  </p>
                  <p className="text-white/30 text-xs tracking-widest">INNOVACIÓN DIGITAL</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
