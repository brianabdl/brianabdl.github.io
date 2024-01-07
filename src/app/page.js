import Image from 'next/image'
import Header from './header'
import Body from './body'
import Footer from './footer'

export default function Home() {
  return (
    <body className="inter container">
      <Header />
      <Body />
      <Footer />
    </body>
  )
}
