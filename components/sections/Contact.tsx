'use client'

import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Send, Mail, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import SectionTag from '@/components/ui/SectionTag'

const schema = z.object({
  name:    z.string().min(2),
  email:   z.string().email(),
  company: z.string().optional(),
  message: z.string().min(10),
})
type FormData = z.infer<typeof schema>

export default function Contact() {
  const t = useTranslations('contact')

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      toast.success(t('success'))
      reset()
    } catch {
      toast.error(t('error'))
    }
  }

  const inputClass = (hasError?: boolean) =>
    `w-full bg-white border ${hasError ? 'border-red-400' : 'border-gray-200'} rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-brand-tech focus:ring-2 focus:ring-brand-tech/10 transition-all`

  return (
    <section id="contact" className="section-pad bg-brand-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <SectionTag>{t('tag')}</SectionTag>
            <h2 className="font-sora font-black text-brand-deep text-4xl sm:text-5xl mt-4 mb-4 leading-tight">
              {t('title')}
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-10">{t('subtitle')}</p>

            <div className="space-y-4">
              <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">
                {t('or')}
              </p>
              <a
                href="mailto:info@jcfdev.com"
                className="flex items-center gap-3 text-brand-deep font-medium hover:text-brand-tech transition-colors"
              >
                <div className="w-10 h-10 bg-brand-ice rounded-xl flex items-center justify-center">
                  <Mail size={16} className="text-brand-tech" />
                </div>
                info@jcfdev.com
              </a>
              <a
                href="tel:+50689690102"
                className="flex items-center gap-3 text-brand-deep font-medium hover:text-brand-tech transition-colors"
              >
                <div className="w-10 h-10 bg-brand-ice rounded-xl flex items-center justify-center">
                  <Phone size={16} className="text-brand-tech" />
                </div>
                {t('phone')}
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t('name')}
                  </label>
                  <input
                    {...register('name')}
                    placeholder="Juan Pérez"
                    className={inputClass(!!errors.name)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t('email')}
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="juan@empresa.com"
                    className={inputClass(!!errors.email)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t('company')}
                </label>
                <input
                  {...register('company')}
                  placeholder="Mi Empresa S.A."
                  className={inputClass()}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t('message')}
                </label>
                <textarea
                  {...register('message')}
                  rows={5}
                  placeholder={t('messagePlaceholder')}
                  className={`${inputClass(!!errors.message)} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-brand-deep hover:bg-brand-tech disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-100"
              >
                {isSubmitting ? t('sending') : t('send')}
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
