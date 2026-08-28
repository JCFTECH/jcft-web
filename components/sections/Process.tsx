'use client'

import { useTranslations } from 'next-intl'
import { MessageCircle, Search, Code, Rocket } from 'lucide-react'
import { motion } from 'framer-motion'
import SectionTag from '@/components/ui/SectionTag'

const stepIcons = [MessageCircle, Search, Code, Rocket]

export default function Process() {
  const t = useTranslations('process')
  const keys = ['discover', 'plan', 'build', 'deliver'] as const

  return (
    <section id="process" className="section-pad bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <div className="mb-16 max-w-2xl">
          <SectionTag>{t('tag')}</SectionTag>
          <h2 className="font-sora font-black text-brand-deep text-4xl sm:text-5xl mt-4 mb-4">
            {t('title')}
          </h2>
          <p className="text-gray-500 text-lg">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">

          {/* Connecting line — desktop only */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-brand-ice via-brand-tech/30 to-brand-ice z-0" />

          {keys.map((key, i) => {
            const Icon = stepIcons[i]
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                {/* Step number + icon */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-brand-ice rounded-2xl flex items-center justify-center border-2 border-white shadow-md">
                    <Icon size={28} className="text-brand-tech" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-brand-deep rounded-full flex items-center justify-center">
                    <span className="font-sora font-black text-white text-xs">{i + 1}</span>
                  </div>
                </div>

                <h3 className="font-sora font-bold text-brand-deep text-lg mb-2">
                  {t(`${key}.title`)}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {t(`${key}.desc`)}
                </p>

                {/* Red accent */}
                <div className="mt-4 w-8 h-0.5 bg-brand-red rounded-full" />
              </motion.div>
            )
          })}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 bg-brand-ice rounded-2xl p-6 flex items-start gap-4"
        >
          <div className="w-2 h-2 rounded-full bg-brand-red flex-shrink-0 mt-2" />
          <p className="text-gray-600 text-sm leading-relaxed">
            <strong className="text-brand-deep">{t('noteTitle')}</strong>{' '}
            {t('noteDesc')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
