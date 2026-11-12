import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(200).optional(),
  message: z.string().trim().min(5).max(5000),
  website: z.string().optional(), // honeypot
})

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export async function POST(req: NextRequest) {
  try {
    const parsed = schema.safeParse(await req.json())
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid fields' }, { status: 400 })
    }
    const { name, email, company, message, website } = parsed.data

    // Honeypot: bots fill hidden fields. Pretend success.
    if (website) return NextResponse.json({ success: true })

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('RESEND_API_KEY is not set; contact form message NOT delivered')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'JCFTech Web <web@jcfdev.com>',
        to: ['info@jcfdev.com'],
        reply_to: email,
        subject: `Nuevo contacto web: ${name}`,
        html: `<p><b>Nombre:</b> ${esc(name)}</p><p><b>Email:</b> ${esc(email)}</p><p><b>Empresa:</b> ${esc(company || 'N/A')}</p><p><b>Mensaje:</b><br>${esc(message).replace(/\n/g, '<br>')}</p>`,
      }),
    })

    if (!res.ok) {
      console.error('Resend error:', res.status, await res.text())
      return NextResponse.json({ error: 'Send failed' }, { status: 502 })
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
