import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { m } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ theme, setTheme }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id)
      })
    }, { root: null, rootMargin: '0px', threshold: 0.45 })

    LINKS.forEach((l) => {
      const el = document.getElementById(l.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed w-full z-40 top-0">
      <m.nav animate={{ backdropFilter: scrolled ? 'blur(6px)' : 'blur(0px)', opacity: scrolled ? 0.98 : 1 }} className={`w-full ${scrolled ? 'bg-[color:var(--bg)]/80' : 'bg-transparent'} border-b border-theme`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <a href="#home" className="text-base sm:text-lg font-semibold" style={{ color: 'var(--primary)' }}>Heer Patel</a>

          <div className="hidden md:flex items-center gap-6 relative">
            <ul className="flex gap-4 text-sm relative">
              {LINKS.map((l) => (
                <li key={l.id} className="relative">
                  <a href={`#${l.id}`} className={`transition px-2 py-1 rounded ${active === l.id ? 'text-[var(--primary)]' : 'text-theme hover:text-theme/90'}`}>{l.label}</a>
                  {active === l.id && (
                    <m.span layoutId="nav-underline" className="absolute left-0 right-0 h-[2px] rounded bg-[var(--primary)] bottom-0 mt-1" />
                  )}
                </li>
              ))}
            </ul>
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button type="button" onClick={() => setOpen(!open)} className="p-2 rounded-md bg-theme">
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden bg-[color:var(--bg)]/80 border-t border-theme">
            <ul className="flex flex-col gap-2 p-4 text-theme">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <a onClick={() => setOpen(false)} href={`#${l.id}`} className="block py-2">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </m.nav>
    </header>
  )
}
