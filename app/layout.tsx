import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jesper Kärnä – Frontend Developer, Seinäjoki',
  description: 'Full stack -kehittäjä Seinäjoelta. React, TypeScript, Next.js, Python, FastAPI. Avoin uusille mahdollisuuksille.',
  metadataBase: new URL('https://jesperkarna.fi'),
  openGraph: {
    title: 'Jesper Kärnä – Full Stack Developer, Seinäjoki',
    description: 'Full stack -kehittäjä Seinäjoelta. React, TypeScript, Next.js, Python, FastAPI.',
    url: 'https://jesperkarna.fi',
    siteName: 'Jesper Kärnä',
    locale: 'fi_FI',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Jesper Kärnä',
              url: 'https://jesperkarna.fi',
              jobTitle: 'Frontend Developer',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Seinäjoki',
                addressCountry: 'FI',
              },
              sameAs: [
                'https://github.com/JesperK25',
                'https://www.linkedin.com/in/jesper-kärnä-240b3a3a7',
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}