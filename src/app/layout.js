import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://brianabdl.my.id'),
  title: 'M. Brian Abdillah',
  description: 'Portofolio Website of M. Brian Abdillah',
  openGraph: {
    title: 'M. Brian Abdillah',
    description: 'Portofolio Website of M. Brian Abdillah',
    url: '/',
    siteName: 'M. Brian Abdillah',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'M. Brian Abdillah',
    description: 'Portofolio Website of M. Brian Abdillah',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
