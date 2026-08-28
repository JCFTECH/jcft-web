'use client'

import { useTranslations } from 'next-intl'
import { Globe, Code2, Zap, MessageSquare, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import SectionTag from '@/components/ui/SectionTag'

const icons = [Globe, Code2, Zap, MessageSquare]
const keys = ['web', 'software', 'automation', 'consulting'] as const

export default function Services() {
  const t = useTranslations('services')

  return (
    <section id="services" className="section-pad bg-brand-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <SectionTag>{t('tag')}</SectionTag>
          <h2 className="font-sora font-black text-brand-deep text-4xl sm:text-5xl mt-4 mb-4">
            {t('title')}
          </h2>
          <p className="text-gray-500 text-lg">{t('subtitle')}</p>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {keys.map((key, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group bg-white border border-gray-100 hover:border-brand-tech/30 rounded-2xl p-8 hover:shadow-xl hover:shadow-brand-deep/5 transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-brand-ice rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-deep transition-colors duration-300">
                    <Icon size={24} className="text-brand-tech group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-sora font-bold text-brand-deep text-xl mb-2">
                      {t(`${key}.title`)}
                    </h3>
                    <p className="text-brand-red text-sm font-medium mb-3">
                      {t(`${key}.problem`)}
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                      {t(`${key}.desc`)}
                    </p>
                    <ul className="space-y-1.5">
                      {[0, 1, 2].map((j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-tech flex-shrink-0" />
                          {t(`${key}.feature${j + 1}`)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
                  <div className="w-8 h-0.5 bg-brand-red rounded-full group-hover:w-16 transition-all duration-500" />
                  <a
                    href="#contact"
                    className="text-brand-tech text-sm font-medium flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {t('askMore')} <ArrowRight size={13} />
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-brand-deep rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="font-sora font-black text-white text-2xl sm:text-3xl mb-2">
              {t('ctaBannerTitle')}
            </p>
            <p className="text-white/50 text-sm">{t('ctaBannerDesc')}</p>
          </div>
          <a
            href="#contact"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 hover:scale-105"
          >
            {t('ctaBannerBtn')} <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
