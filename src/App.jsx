import React, { useEffect } from 'react'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/ProjectsAdvanced'
import Certificates from './components/Certificates'
// Services section removed
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    const root = document.documentElement
    root.classList.add('dark')
    root.classList.remove('light')
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
        <Navbar />
        <main className="pt-20">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Certificates />
          <Contact />
          <Footer />
        </main>
      </m.div>
    </LazyMotion>
  )
}
