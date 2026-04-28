'use client'

import { useTranslations } from 'next-intl'
import { ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import SectionTag from '@/components/ui/SectionTag'

// Add your projects here when ready
const projects: {
  title: string
  desc: string
  tags: string[]
  url?: string
  color: string
}[] = [
  // Example structure:
  // {
  //   title: 'Sistema de Gestión',
  //   desc: 'Plataforma web para gestión de inventario y ventas.',
  //   tags: ['Next.js', 'PostgreSQL', 'Tailwind'],
  //   url: 'https://...',
  //   color: '#0A1F5C',
  // },
]

export default function Portfolio() {
  const t = useTranslations('portfolio')

  return (
    <section id="portfolio" className="section-pad bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <div className="mb-16 max-w-2xl">
          <SectionTag>{t('tag')}</SectionTag>
          <h2 className="font-sora font-black text-brand-deep text-4xl sm:text-5xl mt-4 mb-4">
            {t('title')}
          </h2>
          <p className="text-gray-500 text-lg">{t('subtitle')}</p>
        </div>

        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-gray-200 rounded-3xl"
          >
            <div className="w-16 h-16 bg-brand-ice rounded-2xl flex items-center justify-center font-sora font-black text-brand-deep text-xl mb-4">
              JT
            </div>
            <p className="text-gray-400 font-medium">{t('empty')}</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-brand-light rounded-2xl overflow-hidden border border-gray-100 hover:border-brand-tech/30 hover:shadow-lg transition-all duration-300"
              >
                <div
                  className="h-40 flex items-center justify-center"
                  style={{ background: p.color }}
                >
                  <span className="font-sora font-black text-white text-3xl opacity-20">
                    JT
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-sora font-bold text-brand-deep text-lg mb-2">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{p.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-brand-ice text-brand-tech font-medium px-2.5 py-1 rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-brand-tech text-sm font-medium hover:text-brand-deep transition-colors"
                    >
                      {t('viewMore')}
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
