# JCF Tech — Sitio Web Corporativo

Stack: **Next.js 14** · **TypeScript** · **Tailwind CSS** · **next-intl** · **Framer Motion**

## Inicio rápido

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) — redirige automáticamente a `/es`.

## Estructura

```
app/
  [lang]/
    layout.tsx      # Fuentes, providers
    page.tsx        # Ensambla secciones
  api/contact/      # Endpoint del formulario
components/
  layout/           # Navbar, Footer
  sections/         # Hero, Services, About, Portfolio, Contact
  ui/               # SectionTag y otros componentes reutilizables
i18n/               # Configuración de idiomas
messages/
  es.json           # Textos en español
  en.json           # Textos en inglés
lib/
  utils.ts          # Helper cn()
```

## Idiomas

El sitio soporta español (`/es`) e inglés (`/en`).
Para agregar un idioma nuevo: añadir el locale en `i18n/routing.ts` y crear `messages/[locale].json`.

## Formulario de contacto

El endpoint `app/api/contact/route.ts` está listo. Para activar el envío de emails:

1. Instalá [Resend](https://resend.com): `npm install resend`
2. Agregá tu API key en `.env.local`: `RESEND_API_KEY=re_xxxxx`
3. Descomentá el bloque de Resend en `app/api/contact/route.ts`

## Deploy en Vercel

```bash
# Desde el repo de GitHub, conectar en vercel.com/new
# Variables de entorno: RESEND_API_KEY (cuando estés listo)
```

## Portafolio

Los proyectos se agregan en `components/sections/Portfolio.tsx` en el array `projects`.

## Paleta de colores

| Token | Hex | Uso |
|-------|-----|-----|
| `brand-deep` | `#0A1F5C` | Principal |
| `brand-tech` | `#185FA5` | Secundario |
| `brand-red` | `#C8102E` | Acento CR |
| `brand-ice` | `#E8EFF8` | Fondo suave |
| `brand-light` | `#F4F6FA` | Fondo base |
