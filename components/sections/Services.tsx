'use client'

import { useTranslations } from 'next-intl'
import { Globe, Code2, Zap, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'
import SectionTag from '@/components/ui/SectionTag'

const icons = [Globe, Code2, Zap, MessageSquare]
const keys = ['web', 'software', 'automation', 'consulting'] as const

export default function Services() {
  const t = useTranslations('services')

  return (
    <section id="services" className="section-pad bg-brand-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <div className="mb-16 max-w-2xl">
          <SectionTag>{t('tag')}</SectionTag>
          <h2 className="font-sora font-black text-brand-deep text-4xl sm:text-5xl mt-4 mb-4">
            {t('title')}
          </h2>
          <p className="text-gray-500 text-lg">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {keys.map((key, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group bg-white border border-gray-100 hover:border-brand-tech/30 rounded-2xl p-6 hover:shadow-lg hover:shadow-brand-deep/5 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-brand-ice rounded-xl flex items-center justify-center mb-5 group-hover:bg-brand-deep transition-colors duration-300">
                  <Icon
                    size={22}
                    className="text-brand-tech group-hover:text-white transition-colors duration-300"
                  />
                </div>
                <h3 className="font-sora font-bold text-brand-deep text-lg mb-3">
                  {t(`${key}.title`)}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {t(`${key}.desc`)}
                </p>
                <div className="mt-5 w-8 h-0.5 bg-brand-red rounded-full group-hover:w-full transition-all duration-500" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
