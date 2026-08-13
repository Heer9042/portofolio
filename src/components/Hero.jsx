import { m } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Github, Linkedin, Mail } from 'lucide-react'
import resumePdf from '../assets/Resume.pdf'
import MotionButton from './ui/MotionButton'

export default function Hero() {
  return (
    <m.section id="home" className="min-h-[calc(100dvh-4rem)] sm:min-h-screen flex items-center relative overflow-hidden w-full" aria-label="Hero" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}>
      {/* subtle moving gradient glow in dark mode */}
      <m.div aria-hidden className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" initial={{ opacity: 0.2 }} animate={{ rotate: 0, x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 12, repeat: Infinity, repeatType: 'mirror' }} style={{ background: 'radial-gradient(clamp(300px, 50vw, 600px) clamp(150px, 30vw, 300px) at 10% 20%, rgba(0,255,157,0.04), transparent), radial-gradient(clamp(200px, 40vw, 400px) clamp(100px, 20vw, 200px) at 90% 80%, rgba(0,184,255,0.03), transparent)' }} />
      <div className="max-w-6xl 3xl:max-w-8xl mx-auto px-4 sm:px-6 py-10 sm:py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8 items-center w-full">
        <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="min-w-0 order-2 md:order-1">
          <p className="text-xs sm:text-sm text-violet-300 mb-2 fade-rise">Hello, I am</p>
          <h1 className="text-display font-bold leading-tight bold-effect fade-rise break-words" style={{ color: 'var(--text)' }}>Heer Patel — Aspiring Cybersecurity & Ethical Hacking Enthusiast</h1>

          <div className="mt-4 text-base sm:text-lg md:text-xl terminal break-words">
            <TypeAnimation
              sequence={[
                'Scanning portfolio...',
                1200,
                'Security vulnerabilities: None detected',
                1400,
                'Welcome to my cybersecurity journey',
                1600,
              ]}
              speed={40}
              wrapper="span"
              repeat={Infinity}
            />
          </div>

          <p className="mt-4 sm:mt-6 text-body max-w-xl fade-rise" style={{ color: 'var(--text)' }}>I have completed BCA and I'm currently pursuing MCA. I like learning about web security and fixing problems on websites. I learn fast and like to try things by building them.</p>

          <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3 w-full">
            <MotionButton as="a" href="#projects" className="w-full sm:w-auto px-4 py-2.5 min-h-[44px] text-sm sm:text-base rounded-md text-black text-center touch-target" style={{ background: 'linear-gradient(90deg, var(--primary), var(--secondary))' }}>View Projects</MotionButton>
            <MotionButton as="a" href={resumePdf} download className="w-full sm:w-auto px-4 py-2.5 min-h-[44px] text-sm sm:text-base rounded-md border-theme text-theme text-center glass-theme touch-target">Download Resume</MotionButton>
            <MotionButton as="a" href="#contact" className="w-full sm:w-auto px-4 py-2.5 min-h-[44px] text-sm sm:text-base rounded-md bg-theme border-theme text-theme text-center touch-target">Contact</MotionButton>
          </div>

          <div className="mt-6 flex items-center gap-4 sm:gap-5 text-muted fade-rise">
            <a aria-label="GitHub" href="https://github.com/Heer9042" target="_blank" rel="noreferrer" className="hover:text-white touch-target inline-flex items-center justify-center p-2"><Github size={22} /></a>
            <a aria-label="LinkedIn" href="https://www.linkedin.com/in/heerpatel9042/" target="_blank" rel="noreferrer" className="hover:text-white touch-target inline-flex items-center justify-center p-2"><Linkedin size={22} /></a>
            <a aria-label="Email" href="mailto:heerpatel904242@gmail.com" className="hover:text-white touch-target inline-flex items-center justify-center p-2"><Mail size={22} /></a>
          </div>
        </m.div>

        <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="flex flex-col items-center justify-center md:justify-end order-1 md:order-2 min-w-0">
          <div className="w-40 h-40 xs:w-48 xs:h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full p-1 glass-theme neon-border flex items-center justify-center shrink-0">
            <img src="/myimage.png" alt="Heer Patel" width={288} height={288} className="w-[calc(100%-0.5rem)] h-[calc(100%-0.5rem)] max-w-full rounded-full object-cover border border-theme aspect-square" />
          </div>
          <h2 className="mt-4 sm:mt-6 text-heading font-bold bold-effect fade-rise text-center" style={{ color: 'var(--primary)' }}>Heer Patel</h2>
        </m.div>
      </div>
    </m.section>
  )
}
