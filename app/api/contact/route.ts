import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // TODO: Replace with your preferred email service
    // Options: Resend (recommended), SendGrid, Nodemailer
    //
    // Example with Resend:
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'web@jcfdev.com',
    //   to: 'info@jcfdev.com',
    //   subject: `Nuevo contacto: ${name}`,
    //   html: `<p><b>Nombre:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Empresa:</b> ${company || 'N/A'}</p><p><b>Mensaje:</b> ${message}</p>`,
    // })

    // For now, log to console (replace in production)
    console.log('Contact form submission:', { name, email, company, message })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
