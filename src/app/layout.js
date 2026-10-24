import './globals.css'

export const metadata = {
  metadataBase: new URL('https://brianabdl.my.id'),
  title: 'M. Brian Abdillah',
  description: 'Portfolio website of M. Brian Abdillah',
  openGraph: {
    title: 'M. Brian Abdillah',
    description: 'Portfolio website of M. Brian Abdillah',
    url: '/',
    siteName: 'M. Brian Abdillah',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'M. Brian Abdillah',
    description: 'Portfolio website of M. Brian Abdillah',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  )
}
