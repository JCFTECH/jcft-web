'use client'

import { useTranslations, useLocale } from 'next-intl'
import { ExternalLink, Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import SectionTag from '@/components/ui/SectionTag'

const projects = [
  {
    id: 'autolimar',
    name: 'Autolimar Soluciones',
    logo: '/images/portfolio/autolimar.jpg',
    logoBg: '#ffffff',
    invert: false,
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

export default function Portfolio() {
  const t = useTranslations('portfolio')
  const locale = useLocale() as 'es' | 'en'

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
              className="group bg-brand-light rounded-2xl overflow-hidden border border-gray-100 hover:border-brand-tech/30 hover:shadow-xl hover:shadow-brand-deep/5 transition-all duration-300 flex flex-col"
            >
              {/* Card header con logo */}
              <div
                className="h-44 flex items-center justify-center p-6 relative overflow-hidden"
                style={{ background: p.color }}
              >
                {/* Dot pattern */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.8) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />

                {/* Accent top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: p.accentColor }}
                />

                {/* Logo — mismo tamaño para todos */}
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
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </div>

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
                <h3 className="font-sora font-bold text-brand-deep text-lg mb-3">
                  {p.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">
                  {p.desc[locale]}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
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
          <a
            href="#contact"
            className="text-brand-tech hover:text-brand-deep font-medium transition-colors"
          >
            {locale === 'es' ? 'Hablemos.' : "Let's talk."}
          </a>
        </motion.p>

      </div>
    </section>
  )
}