'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { ExternalLink, Lock, X, ChevronLeft, ChevronRight, Images } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionTag from '@/components/ui/SectionTag'

const autolinarScreenshots = [
  { src: '/images/portfolio/autolimar/inicio.jpg',    label: { es: 'Pantalla de Inicio',    en: 'Home Screen' } },
  { src: '/images/portfolio/autolimar/login.jpg',     label: { es: 'Login',                 en: 'Login' } },
  { src: '/images/portfolio/autolimar/ordenes.jpg',   label: { es: 'Órdenes de Trabajo',    en: 'Work Orders' } },
  { src: '/images/portfolio/autolimar/inventario.jpg',label: { es: 'Inventario',             en: 'Inventory' } },
  { src: '/images/portfolio/autolimar/reportes.jpg',  label: { es: 'Reportes',               en: 'Reports' } },
  { src: '/images/portfolio/autolimar/usuarios.jpg',  label: { es: 'Usuarios',               en: 'Users' } },
  { src: '/images/portfolio/autolimar/backup.jpg',    label: { es: 'Backup Automático',      en: 'Auto Backup' } },
]

const projects = [
  {
    id: 'autolimar',
    name: 'Autolimar Soluciones',
    logo: '/images/portfolio/autolimar.jpg',
    logoBg: '#ffffff',
    invert: false,
    hasGallery: true,
    screenshots: autolinarScreenshots,
    category: { es: 'Sistema de Escritorio', en: 'Desktop Application' },
    desc: {
      es: 'Sistema de gestión integral para taller automotriz. Desarrollado en C# con MySQL, incluye órdenes de trabajo, inventario, vehículos, roles de usuario y backup automático a OneDrive.',
      en: 'Complete management system for an automotive workshop. Built with C# and MySQL, featuring work orders, inventory, vehicle management, user roles and automatic OneDrive backup.',
    },
    tags: ['C#', 'MySQL', 'Desktop', 'WinForms'],
    color: '#0A1F5C',
    accentColor: '#C8102E',
    url: null,
    status: { es: 'En producción', en: 'In production' },
    restricted: false,
  },
  {
    id: 'aresa-web',
    name: 'ARESA — Sitio Web',
    logo: '/images/portfolio/aresa.jpg',
    logoBg: 'transparent',
    invert: false,
    hasGallery: false,
    screenshots: [],
    category: { es: 'Sitio Web Corporativo', en: 'Corporate Website' },
    desc: {
      es: 'Sitio web corporativo bilingüe para empresa de reparaciones estructurales de aeronaves en Costa Rica. Certificación CO OMA-045, con galería, servicios y blog.',
      en: 'Bilingual corporate website for an aircraft structural repair company in Costa Rica. CO OMA-045 certified, with gallery, services and blog.',
    },
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'i18n'],
    color: '#1a1a2e',
    accentColor: '#f0a500',
    url: 'https://aresacr.net',
    status: { es: 'Próximamente en vivo', en: 'Going live soon' },
    restricted: false,
  },
  {
    id: 'aresa-sys',
    name: 'ARESA — Sistema Interno',
    logo: '/images/portfolio/aresa.jpg',
    logoBg: 'transparent',
    invert: false,
    hasGallery: false,
    screenshots: [],
    category: { es: 'Sistema de Gestión Web', en: 'Web Management System' },
    desc: {
      es: 'Sistema interno integrado al sitio de ARESA. Dashboard operativo, órdenes de trabajo para aeronaves, inventario, manuales técnicos y control de calibración de herramientas.',
      en: 'Internal system integrated into the ARESA website. Operational dashboard, aircraft work orders, inventory, technical manuals and tool calibration control.',
    },
    tags: ['Next.js', 'PostgreSQL', 'Auth', 'Dashboard'],
    color: '#0f2d5e',
    accentColor: '#f0a500',
    url: 'https://aresacr.net',
    status: { es: 'Acceso restringido', en: 'Restricted access' },
    restricted: true,
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

  // Prevent body scroll
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
        style={{ background: 'rgba(10, 31, 92, 0.92)', backdropFilter: 'blur(8px)' }}
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
          {/* Modal header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-brand-light">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.logo} alt={project.name} className="h-8 w-auto object-contain" />
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

          {/* Image */}
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

            {/* Arrows */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand-deep/80 hover:bg-brand-deep text-white flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand-deep/80 hover:bg-brand-deep text-white flex items-center justify-center transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 px-4 py-3 overflow-x-auto bg-white border-t border-gray-100">
            {project.screenshots.map((s, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                  i === current ? 'border-brand-tech' : 'border-transparent opacity-50 hover:opacity-80'
                }`}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group bg-brand-light rounded-2xl overflow-hidden border border-gray-100 hover:border-brand-tech/30 hover:shadow-xl hover:shadow-brand-deep/5 transition-all duration-300 flex flex-col ${p.hasGallery ? 'cursor-pointer' : ''}`}
              onClick={() => p.hasGallery && setActiveModal(p)}
            >
              {/* Card header con logo */}
              <div
                className="h-44 flex items-center justify-center p-6 relative overflow-hidden"
                style={{ background: p.color }}
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.8) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: p.accentColor }} />

                {/* Logo */}
                <div
                  className="relative z-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: p.logoBg,
                    width: '160px',
                    height: '160px',
                    padding: p.logoBg === '#ffffff' ? '12px' : '0px',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.logo}
                    alt={p.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>

                {/* Gallery hint */}
                {p.hasGallery && (
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-white/15 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <Images size={12} />
                    {locale === 'es' ? 'Ver galería' : 'View gallery'}
                  </div>
                )}

                {/* Status badge */}
                <div
                  className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{
                    background: `${p.accentColor}22`,
                    color: p.accentColor,
                    border: `1px solid ${p.accentColor}44`,
                  }}
                >
                  {p.restricted && <Lock size={10} />}
                  {p.status[locale]}
                </div>
              </div>

              {/* Card body */}
              <div className="p-6 flex flex-col flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-tech mb-1">
                  {p.category[locale]}
                </p>
                <h3 className="font-sora font-bold text-brand-deep text-lg mb-3">{p.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">{p.desc[locale]}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {p.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-brand-ice text-brand-tech font-medium px-2.5 py-1 rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>

                {p.hasGallery && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setActiveModal(p) }}
                    className="inline-flex items-center gap-1.5 text-brand-tech text-sm font-medium hover:text-brand-deep transition-colors"
                  >
                    <Images size={13} />
                    {locale === 'es' ? 'Ver capturas del sistema' : 'View system screenshots'}
                  </button>
                )}

                {p.url && !p.hasGallery && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
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

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-400 text-sm mt-12"
        >
          {locale === 'es' ? '¿Tenés un proyecto en mente? ' : 'Have a project in mind? '}
          <a href="#contact" className="text-brand-tech hover:text-brand-deep font-medium transition-colors">
            {locale === 'es' ? 'Hablemos.' : "Let's talk."}
          </a>
        </motion.p>
      </div>

      {/* Modal */}
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