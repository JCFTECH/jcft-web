import { cn } from '@/lib/utils'

export default function SectionTag({
  children,
  light = false,
}: {
  children: React.ReactNode
  light?: boolean
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border',
        light
          ? 'bg-white/10 border-white/20 text-white/70'
          : 'bg-brand-ice border-brand-tech/20 text-brand-tech'
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full', light ? 'bg-brand-red' : 'bg-brand-red')} />
      {children}
    </span>
  )
}
