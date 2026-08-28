'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { ExternalLink, Lock, X, ChevronLeft, ChevronRight, Images, ArrowRight } from 'lucide-react'
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
  {
    id: 'caliga',
    name: 'CALIGA',
    logo: '/images/portfolio/caliga_logo.png',
    logoBg: '#ffffff',
    hasGallery: false,
    screenshots: [],
    category: { es: 'Producto SaaS Propio', en: 'Own SaaS Product' },
    impact: {
      es: 'Plataforma construida desde cero para reemplazar Excel y procesos manuales en operaciones de aviación latinoamericanas.',
      en: 'Platform built from scratch to replace Excel and manual processes in Latin American aviation operations.',
    },
    desc: {
      es: 'Plataforma SaaS de gestión aeronáutica con trazabilidad completa. 10+ módulos: flotas, mantenimiento, inventario, SMS, cumplimiento regulatorio y más.',
      en: 'Aeronautical management SaaS platform with full traceability. 10+ modules: fleets, maintenance, inventory, SMS, regulatory compliance and more.',
    },
    tags: ['SaaS', 'Multi-tenant', 'Next.js', 'Aviation'],
    color: '#0c1a3a',
    accentColor: '#3b82f6',
    url: 'https://www.mycaliga.com',
    status: { es: 'En desarrollo activo', en: 'Actively in development' },
    restricted: false,
    featured: false,
    isOwn: true,
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

  const featured = projects.find(p => p.featured)!
  const rest = projects.filter(p => !p.featured)

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

        {/* Featured project — full width */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group bg-brand-light rounded-2xl overflow-hidden border border-gray-100 hover:border-brand-tech/30 hover:shadow-xl hover:shadow-brand-deep/5 transition-all duration-300 mb-6 cursor-pointer"
          onClick={() => featured.hasGallery && setActiveModal(featured)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left — visual */}
            <div
              className="h-64 lg:h-auto flex items-center justify-center p-8 relative overflow-hidden"
              style={{ background: featured.color, minHeight: '280px' }}
            >
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.8) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
              />
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: featured.accentColor }} />

              <div className="relative z-10 bg-white rounded-2xl p-4 flex items-center justify-center" style={{ width: '180px', height: '180px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={featured.logo!} alt={featured.name} className="w-full h-full object-contain" />
              </div>

              {featured.hasGallery && (
                <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 bg-white/15 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <Images size={12} />
                  {locale === 'es' ? `${featured.screenshots.length} capturas del sistema` : `${featured.screenshots.length} system screenshots`}
                </div>
              )}

              <div
                className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
                style={{ background: `${featured.accentColor}22`, color: featured.accentColor, border: `1px solid ${featured.accentColor}44` }}
              >
                {featured.status[locale]}
              </div>
            </div>

            {/* Right — content */}
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-tech">
                  {featured.category[locale]}
                </p>
                <span className="text-xs bg-brand-red/10 text-brand-red font-medium px-2 py-0.5 rounded-full">
                  {locale === 'es' ? 'Destacado' : 'Featured'}
                </span>
              </div>

              <h3 className="font-sora font-black text-brand-deep text-2xl sm:text-3xl mb-3">
                {featured.name}
              </h3>

              <p className="text-brand-red text-sm font-medium mb-3 leading-relaxed">
                {featured.impact[locale]}
              </p>

              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                {featured.desc[locale]}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {featured.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-brand-ice text-brand-tech font-medium px-2.5 py-1 rounded-lg">
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); setActiveModal(featured) }}
                className="inline-flex items-center gap-2 text-brand-tech text-sm font-semibold hover:text-brand-deep transition-colors"
              >
                <Images size={14} />
                {locale === 'es' ? 'Ver capturas del sistema' : 'View system screenshots'}
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Rest — two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {rest.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-brand-light rounded-2xl overflow-hidden border border-gray-100 hover:border-brand-tech/30 hover:shadow-xl hover:shadow-brand-deep/5 transition-all duration-300 flex flex-col"
            >
              <div
                className="h-44 flex items-center justify-center p-6 relative overflow-hidden"
                style={{ background: p.color }}
              >
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.8) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                />
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: p.accentColor }} />

                {/* Logo */}
                <div
                  className="relative z-10 rounded-xl flex items-center justify-center"
                  style={{ background: p.logoBg, width: '160px', height: '160px', padding: '12px' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.logo!}
                    alt={p.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
                {/* Own product badge */}
                {'isOwn' in p && p.isOwn && (
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-white/15 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
                    ⭐ {locale === 'es' ? 'Producto propio' : 'Own product'}
                  </div>
                )}

                <div
                  className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{ background: `${p.accentColor}22`, color: p.accentColor, border: `1px solid ${p.accentColor}44` }}
                >
                  {p.restricted && <Lock size={10} />}
                  {p.status[locale]}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-tech mb-1">
                  {p.category[locale]}
                </p>
                <h3 className="font-sora font-bold text-brand-deep text-xl mb-2">{p.name}</h3>

                <p className="text-brand-red text-xs font-medium mb-3 leading-relaxed">
                  {p.impact[locale]}
                </p>

                <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">{p.desc[locale]}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {p.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-brand-ice text-brand-tech font-medium px-2.5 py-1 rounded-lg">
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
                    {locale === 'es' ? 'Ver proyecto' : 'View project'}
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
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