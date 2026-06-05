import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { m, AnimatePresence } from 'framer-motion'

export default function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full shadow-lg flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(90deg, var(--primary), var(--secondary))', color: '#041018' }}
    >
      <AnimatePresence mode="wait">
        {theme === 'dark' ? (
          <m.span key="sun" initial={{ rotate: -20, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 20, opacity: 0 }} transition={{ duration: 0.28 }}>
            <Sun size={16} />
          </m.span>
        ) : (
          <m.span key="moon" initial={{ rotate: 20, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -20, opacity: 0 }} transition={{ duration: 0.28 }}>
            <Moon size={16} />
          </m.span>
        )}
      </AnimatePresence>
    </button>
  )
}
