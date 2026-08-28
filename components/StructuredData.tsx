export default function StructuredData({ lang }: { lang: string }) {
  const isEs = lang === 'es'

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://www.jcfdev.com',
    name: 'JCF Tech S.R.L.',
    alternateName: 'JCFTech',
    description: isEs
      ? 'Empresa costarricense de desarrollo de software a medida, sitios web y automatizaciones para pymes y empresas.'
      : 'Costa Rican custom software development, web design and automation company for businesses.',
    url: 'https://www.jcfdev.com',
    logo: 'https://www.jcfdev.com/images/portfolio/autolimar.jpg',
    image: 'https://www.jcfdev.com/og-image.png',
    telephone: '+50689690102',
    email: 'info@jcfdev.com',
    foundingDate: '2026',
    legalName: 'JCF Tech S.R.L.',
    taxID: '3-102-935084',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Palmares',
      addressLocality: 'Palmares',
      addressRegion: 'Alajuela',
      addressCountry: 'CR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '10.0484',
      longitude: '-84.4285',
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'Costa Rica',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Alajuela',
      },
    ],
    serviceType: isEs
      ? [
          'Desarrollo de Software a Medida',
          'Desarrollo Web',
          'Automatizaciones Empresariales',
          'Consultoría Tecnológica',
        ]
      : [
          'Custom Software Development',
          'Web Development',
          'Business Automation',
          'Technology Consulting',
        ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: isEs ? 'Servicios de Tecnología' : 'Technology Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isEs ? 'Desarrollo Web' : 'Web Development',
            description: isEs
              ? 'Sitios y aplicaciones web modernas, rápidas y optimizadas para móvil.'
              : 'Modern, fast and mobile-optimized websites and web applications.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isEs ? 'Software a Medida' : 'Custom Software',
            description: isEs
              ? 'Sistemas diseñados exactamente para tu operación y flujo de trabajo.'
              : 'Systems designed exactly for your operation and workflow.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isEs ? 'Automatizaciones' : 'Automations',
            description: isEs
              ? 'Conectamos tus herramientas y eliminamos procesos repetitivos.'
              : 'We connect your tools and eliminate repetitive processes.',
          },
        },
      ],
    },
    sameAs: [
      'https://www.instagram.com/jcftech.cr',
      'https://www.facebook.com/JCFTechSRL',
    ],
    inLanguage: isEs ? 'es-CR' : 'en',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
    />
  )
}
