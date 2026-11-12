'use client'

import { useTranslations } from 'next-intl'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const t = useTranslations('footer')
  const href = `https://wa.me/50689690102?text=${encodeURIComponent(t('waMessage'))}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsapp')}
      title={t('whatsapp')}
      className="fixed bottom-5 left-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle size={28} />
    </a>
  )
}
