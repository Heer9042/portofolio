import { m } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Github, Linkedin, Mail } from 'lucide-react'
import resumePdf from '../assets/Resume.pdf'
import MotionButton from './ui/MotionButton'

export default function Hero() {
  return (
    <m.section id="home" className="min-h-screen flex items-center relative" aria-label="Hero" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}>
      {/* subtle moving gradient glow in dark mode */}
      <m.div aria-hidden className="absolute inset-0 pointer-events-none -z-10" initial={{ opacity: 0.2 }} animate={{ rotate: 0, x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 12, repeat: Infinity, repeatType: 'mirror' }} style={{ background: 'radial-gradient(600px 300px at 10% 20%, rgba(0,255,157,0.04), transparent), radial-gradient(400px 200px at 90% 80%, rgba(0,184,255,0.03), transparent)' }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
        <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="text-xs sm:text-sm text-violet-300 mb-2">Hello, I am</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: 'var(--text)' }}>Heer Patel — Aspiring Cybersecurity & Ethical Hacking Enthusiast</h1>

          <div className="mt-4 text-lg sm:text-xl terminal">
            <TypeAnimation
              sequence={[
                'Initializing system...',
                1200,
                'Access granted to portfolio...',
                1400,
                'Welcome — browsing secure assets',
                1600,
              ]}
              speed={40}
              wrapper="span"
              repeat={Infinity}
            />
          </div>

          <p className="mt-6 text-sm sm:text-base max-w-xl" style={{ color: 'var(--text)' }}>I am a BCA student. I like learning about web security and fixing problems on websites. I learn fast and like to try things by building them.</p>

          <div className="mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
            <MotionButton as="a" href="#projects" className="px-4 py-2.5 text-sm sm:text-base rounded-md text-black text-center" style={{ background: 'linear-gradient(90deg, var(--primary), var(--secondary))' }}>View Projects</MotionButton>
            <MotionButton as="a" href={resumePdf} download className="px-4 py-2.5 text-sm sm:text-base rounded-md border-theme text-theme text-center glass-theme">Download</MotionButton>
            <MotionButton as="a" href="#contact" className="px-4 py-2.5 text-sm sm:text-base rounded-md bg-theme border-theme text-theme text-center">Contact</MotionButton>
          </div>

          <div className="mt-6 flex items-center gap-4 sm:gap-5 text-muted text-lg sm:text-base">
            <a aria-label="GitHub" href="https://github.com/Heer9042" target="_blank" rel="noreferrer" className="hover:text-white"><Github /></a>
            <a aria-label="LinkedIn" href="https://www.linkedin.com/in/heerpatel9042/" target="_blank" rel="noreferrer" className="hover:text-white"><Linkedin /></a>
            <a aria-label="Email" href="mailto:heerpatel904242@gmail.com" className="hover:text-white"><Mail /></a>
          </div>
        </m.div>

        <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="flex justify-center md:justify-end mt-8 md:mt-0">
          <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-80 md:h-80 rounded-2xl p-1 glass-theme neon-border flex items-center justify-center">
            <div className="w-44 h-44 sm:w-52 sm:h-52 md:w-72 md:h-72 rounded-2xl bg-theme flex items-center justify-center border border-theme text-center">
              <span className="text-2xl sm:text-3xl md:text-5xl font-bold text-[var(--primary)]">YN</span>
            </div>
          </div>
        </m.div>
      </div>
    </m.section>
  )
}
