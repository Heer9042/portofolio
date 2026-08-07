import React, { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { m, AnimatePresence } from 'framer-motion'

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(() => (typeof window !== 'undefined' ? window.scrollY > 20 : false))
  const menuRef = useRef(null)
  const menuButtonRef = useRef(null)

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
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  function closeMenu() {
    setOpen(false)
    menuButtonRef.current?.focus()
  }

  return (
    <header className="fixed w-full z-40 top-0 left-0 right-0">
      <m.nav
        animate={{ backdropFilter: scrolled ? 'blur(6px)' : 'blur(0px)', opacity: scrolled ? 0.98 : 1 }}
        className={`w-full ${scrolled ? 'bg-[color:var(--bg)]/80' : 'bg-transparent'} border-b border-theme`}
        aria-label="Main navigation"
      >
        <div className="max-w-6xl 3xl:max-w-8xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <a href="#home" className="text-base sm:text-lg font-semibold shrink-0 min-h-[44px] inline-flex items-center" style={{ color: 'var(--primary)' }}>Heer Patel</a>

          <div className="hidden md:flex items-center gap-6 relative">
            <ul className="flex flex-wrap gap-1 sm:gap-4 text-sm relative">
              {LINKS.map((l) => (
                <li key={l.id} className="relative">
                  <a
                    href={`#${l.id}`}
                    className={`transition px-3 py-2 rounded min-h-[44px] inline-flex items-center ${active === l.id ? 'text-[var(--primary)]' : 'text-theme hover:text-theme/90'}`}
                  >
                    {l.label}
                  </a>
                  {active === l.id && (
                    <m.span layoutId="nav-underline" className="absolute left-2 right-2 h-[2px] rounded bg-[var(--primary)] bottom-1" />
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:hidden flex items-center">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen(!open)}
              className="p-2.5 rounded-md bg-theme touch-target inline-flex items-center justify-center"
              aria-expanded={open}
              aria-controls="mobile-nav-menu"
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <m.div
              id="mobile-nav-menu"
              ref={menuRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden bg-[color:var(--bg)]/95 border-t border-theme"
            >
              <ul className="flex flex-col gap-1 p-4 text-theme">
                {LINKS.map((l) => (
                  <li key={l.id}>
                    <a
                      onClick={closeMenu}
                      href={`#${l.id}`}
                      className={`block py-3 px-3 rounded-md min-h-[44px] ${active === l.id ? 'text-[var(--primary)] bg-theme' : 'hover:bg-theme/50'}`}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </m.div>
          )}
        </AnimatePresence>
      </m.nav>
    </header>
  )
}
