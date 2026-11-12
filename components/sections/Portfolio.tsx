'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { ExternalLink, X, ChevronLeft, ChevronRight, Images, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionTag from '@/components/ui/SectionTag'

const autolinarScreenshots = [
  { src: '/images/portfolio/autolimar/inicio.jpg',     label: { es: 'Pantalla de Inicio',  en: 'Home Screen' } },
  { src: '/images/portfolio/autolimar/login.jpg',      label: { es: 'Login',               en: 'Login' } },
  { src: '/images/portfolio/autolimar/ordenes.jpg',    label: { es: 'Órdenes de Trabajo',  en: 'Work Orders' } },
  { src: '/images/portfolio/autolimar/inventario.jpg', label: { es: 'Inventario',           en: 'Inventory' } },
  { src: '/images/portfolio/autolimar/reportes.jpg',   label: { es: 'Reportes',             en: 'Reports' } },
  { src: '/images/portfolio/autolimar/usuarios.jpg',   label: { es: 'Usuarios',             en: 'Users' } },
  { src: '/images/portfolio/autolimar/backup.jpg',     label: { es: 'Backup Automático',    en: 'Auto Backup' } },
]

const projects = [
  {
    id: 'autolimar',
    name: 'Autolimar Soluciones',
    logo: '/images/portfolio/autolimar.jpg',
    logoBg: '#ffffff',
    hasGallery: true,
    screenshots: autolinarScreenshots,
    category: { es: 'Sistema de Escritorio', en: 'Desktop Application' },
    impact: {
      es: 'Eliminaron el uso de hojas de cálculo y WhatsApp para gestionar el taller.',
      en: 'Eliminated the use of spreadsheets and WhatsApp to manage the workshop.',
    },
    desc: {
      es: 'Sistema de gestión integral para taller automotriz. Órdenes de trabajo, inventario, vehículos, roles de usuario y backup automático a OneDrive.',
      en: 'Complete management system for an automotive workshop. Work orders, inventory, vehicle management, user roles and automatic OneDrive backup.',
    },
    tags: ['C#', 'MySQL', 'Desktop', 'WinForms'],
    color: '#0A1F5C',
    accentColor: '#C8102E',
    url: null,
    status: { es: 'En producción', en: 'In production' },
    restricted: false,
    featured: true,
  },
  {
    id: 'aresa',
    name: 'ARESA S.A.',
    logo: '/images/portfolio/aresa_logo.png',
    logoBg: '#ffffff',
    hasGallery: false,
    screenshots: [],
    category: { es: 'Web + Sistema Interno', en: 'Web + Internal System' },
    impact: {
      es: 'Presencia digital profesional y gestión operativa centralizada para empresa aeronáutica certificada.',
      en: 'Professional digital presence and centralized operational management for a certified aeronautical company.',
    },
    desc: {
      es: 'Sitio web corporativo bilingüe (CO OMA-045) + sistema interno de gestión: órdenes de trabajo para aeronaves, inventario, manuales técnicos y control de herramientas.',
      en: 'Bilingual corporate website (CO OMA-045) + internal management system: aircraft work orders, inventory, technical manuals and tool calibration control.',
    },
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'i18n'],
    color: '#1a1a2e',
    accentColor: '#f0a500',
    url: 'https://aresacr.net',
    status: { es: 'En producción', en: 'In production' },
    restricted: false,
    featured: false,
  },
]

type Project = typeof projects[0]

function GalleryModal({
  project,
  locale,
  onClose,
}: {
  project: Project
  locale: 'es' | 'en'
  onClose: () => void
}) {
  const [current, setCurrent] = useState(0)
  const total = project.screenshots.length

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total])
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, prev, next])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(10, 31, 92, 0.95)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="relative bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-4xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-brand-light">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.logo!} alt={project.name} className="h-8 w-auto object-contain" />
              <div>
                <p className="font-sora font-bold text-brand-deep text-sm">{project.name}</p>
                <p className="text-xs text-gray-400">
                  {project.screenshots[current]?.label[locale]} · {current + 1} / {total}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-brand-red hover:text-white flex items-center justify-center transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          <div className="relative bg-gray-50" style={{ height: '60vh' }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={project.screenshots[current]?.src}
                alt={project.screenshots[current]?.label[locale]}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full object-contain"
              />
            </AnimatePresence>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand-deep/80 hover:bg-brand-deep text-white flex items-center justify-center transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand-deep/80 hover:bg-brand-deep text-white flex items-center justify-center transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="flex gap-2 px-4 py-3 overflow-x-auto bg-white border-t border-gray-100">
            {project.screenshots.map((s, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${i === current ? 'border-brand-tech' : 'border-transparent opacity-50 hover:opacity-80'}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} alt={s.label[locale]} className="h-12 w-20 object-cover" />
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Portfolio() {
  const t = useTranslations('portfolio')
  const locale = useLocale() as 'es' | 'en'
  const [activeModal, setActiveModal] = useState<Project | null>(null)

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

        {/* Projects — uniform rows, alternating sides */}
        <div className="space-y-8 mb-12">
          {projects.map((p, i) => {
            const flip = i % 2 === 1
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-5 rounded-2xl overflow-hidden border border-gray-200 bg-white hover:shadow-xl hover:shadow-brand-deep/5 transition-shadow duration-300 ${p.hasGallery ? 'cursor-pointer' : ''}`}
                onClick={() => p.hasGallery && setActiveModal(p)}
              >
                {/* Visual panel */}
                <div
                  className={`lg:col-span-2 relative flex items-center justify-center p-10 min-h-[240px] overflow-hidden ${flip ? 'lg:order-2' : ''}`}
                  style={{ background: p.color }}
                >
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.8) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                  />
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ background: p.accentColor }} />
                  <span className="absolute top-5 left-6 font-sora font-black text-white/20 text-sm tracking-widest">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="relative z-10 bg-white rounded-2xl p-5 flex items-center justify-center shadow-lg" style={{ width: '190px', height: '190px' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.logo} alt={p.name} className="w-full h-full object-contain" />
                  </div>

                  <div
                    className="absolute bottom-4 left-6 z-10 flex items-center gap-2 text-xs font-medium text-white/80"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    {p.status[locale]}
                  </div>
                </div>

                {/* Content */}
                <div className={`lg:col-span-3 p-8 sm:p-10 flex flex-col justify-center ${flip ? 'lg:order-1' : ''}`}>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-tech mb-2">
                    {p.category[locale]}
                  </p>
                  <h3 className="font-sora font-black text-brand-deep text-2xl sm:text-3xl mb-4">{p.name}</h3>

                  <p className="text-gray-600 leading-relaxed mb-5">{p.desc[locale]}</p>

                  <div className="border-l-4 pl-4 py-1 mb-6" style={{ borderColor: p.accentColor }}>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                      {locale === 'es' ? 'Resultado' : 'Outcome'}
                    </p>
                    <p className="text-brand-deep text-sm font-medium leading-relaxed">{p.impact[locale]}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-brand-ice text-brand-tech font-medium px-2.5 py-1 rounded-lg">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-5">
                    {p.hasGallery && (
                      <button
                        onClick={(e) => { e.stopPropagation(); setActiveModal(p) }}
                        className="inline-flex items-center gap-2 bg-brand-deep hover:bg-brand-tech text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                      >
                        <Images size={14} />
                        {locale === 'es' ? `Ver ${p.screenshots.length} capturas` : `View ${p.screenshots.length} screenshots`}
                        <ArrowRight size={13} />
                      </button>
                    )}
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 bg-brand-deep hover:bg-brand-tech text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                      >
                        {locale === 'es' ? 'Visitar sitio' : 'Visit site'}
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-brand-deep rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="font-sora font-black text-white text-xl sm:text-2xl mb-1">
              {locale === 'es' ? '¿Tu proyecto podría ser el siguiente?' : 'Could your project be next?'}
            </p>
            <p className="text-white/50 text-sm">
              {locale === 'es' ? 'Cada cliente tiene una necesidad distinta. Empezamos por entender la tuya.' : 'Every client has a different need. We start by understanding yours.'}
            </p>
          </div>
          <a
            href="#contact"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 hover:scale-105"
          >
            {locale === 'es' ? 'Hablemos' : "Let's talk"}
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>

      {activeModal && (
        <GalleryModal
          project={activeModal}
          locale={locale}
          onClose={() => setActiveModal(null)}
        />
      )}
    </section>
  )
}
