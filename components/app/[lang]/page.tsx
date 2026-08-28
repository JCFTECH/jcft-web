import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Process from '@/components/sections/Process'
import About from '@/components/sections/About'
import Portfolio from '@/components/sections/Portfolio'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <About />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
