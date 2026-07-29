import { useState, useEffect, useRef } from 'react'
import { m } from 'framer-motion'
import PropTypes from 'prop-types'
import MotionButton from './ui/MotionButton'
import { FaCode, FaShieldAlt } from 'react-icons/fa'
import { HiOutlineX } from 'react-icons/hi'
import { STRUCTURED, TECHNICAL_SKILLS, CYBERSECURITY_SKILLS } from '../data/skills'



const container = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } },
}

function SkillBar({ label, value }) {
  const barRef = useRef(null)

  return (
    <div>
      <div className="flex justify-between text-xs text-muted mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full bg-theme h-2 rounded-full overflow-hidden">
        <m.div
          ref={barRef}
          className="h-full bg-gradient-to-r from-indigo-400 to-pink-500"
          initial={{ width: '0%' }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          onViewportEnter={() => { if (barRef.current) barRef.current.style.willChange = 'width' }}
          onAnimationComplete={() => { if (barRef.current) barRef.current.style.willChange = '' }}
        />
      </div>
    </div>
  )
}

SkillBar.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
}

function parseStructured(text) {
  return text
    .trim()
    .split('\n\n')
    .map((block) => {
      const lines = block.split('\n').flatMap((l) => {
        const trimmed = l.trim()
        return trimmed ? [trimmed] : []
      })
      const title = lines[0] || ''
      const items = lines.slice(1).flatMap((l) => {
        const cleaned = l.replace(/^[-+\s]*/g, '').trim()
        return cleaned ? [cleaned] : []
      })
      return { title, items }
    })
}

function toMarkdown(sections) {
  return sections
    .map((s) => {
      const items = s.items.map((i) => `- ${i}`).join('\n')
      return `## ${s.title}\n\n${items}`
    })
    .join('\n\n')
}

function downloadStructuredText() {
  const blob = new Blob([STRUCTURED.trim()], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'Heer_Patel_Skills.txt'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export default function Skills() {
  const [showAll, setShowAll] = useState(false)
  const [copied, setCopied] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  async function copyText(mode = 'plain') {
    try {
      const text = mode === 'md' ? toMarkdown(parseStructured(STRUCTURED)) : STRUCTURED.trim()
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') {
        setModalOpen(false)
        setShowAll(false)
      }
    }
    if (modalOpen) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modalOpen])

  return (
    <m.section id="skills" className="py-16 sm:py-20 relative" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute -inset-x-40 -top-40 -bottom-20 blur-3xl opacity-40" style={{ background: 'radial-gradient(600px 400px at 10% 20%, rgba(0,187,255,0.12), transparent 8%), radial-gradient(600px 400px at 90% 80%, rgba(255,0,170,0.08), transparent 10%)' }} />
        </div>
        <m.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-2xl sm:text-3xl md:text-4xl font-bold bold-effect mb-6">Skills</m.h2>

        

        <m.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <m.div variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }} whileHover={{ scale: 1.02 }} className="p-6 rounded-2xl glass-theme border-theme shadow-theme">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-md bg-theme text-[var(--primary)] border-theme"><FaShieldAlt size={20} /></div>
                <div>
                  <h3 className="font-semibold text-xl">Cybersecurity</h3>
                  <p className="text-sm text-gray-300">Hands-on learning and practical tools for web security and ethical hacking.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <a href="https://tryhackme.com" target="_blank" rel="noopener noreferrer" aria-label="TryHackMe">
                  <MotionButton className="px-4 py-2 min-w-[140px] bg-[var(--primary)] text-black rounded-md flex items-center justify-center gap-2 text-sm font-medium shadow-sm hover:shadow-md" title="TryHackMe">
                    <span>TryHackMe</span>
                  </MotionButton>
                </a>

                <a href="https://www.hackthebox.com" target="_blank" rel="noopener noreferrer" aria-label="Hack The Box">
                  <MotionButton className="px-4 py-2 min-w-[140px] bg-[var(--primary)] text-black rounded-md flex items-center justify-center gap-2 text-sm font-medium shadow-sm hover:shadow-md" title="Hack The Box">
                    <span>Hack The Box</span>
                  </MotionButton>
                </a>

              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {CYBERSECURITY_SKILLS.map((c) => (
                  <div key={c.label}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{c.label}</div>
                      <div className="text-xs text-muted">{c.value}%</div>
                    </div>
                    <div className="w-full bg-theme h-2 rounded-full overflow-hidden mb-2">
                      <m.div
                        className="h-full"
                        initial={{ width: '0%' }}
                        whileInView={{ width: `${c.value}%` }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.9, ease: 'easeOut' }}
                        style={{ width: `${c.value}%`, background: 'linear-gradient(90deg,#f59e0b,#ec4899)' }}
                      />
                    </div>
                    <p className="text-xs text-muted">{c.description || ''}</p>
                  </div>
                ))}
            </div>
          </m.div>

          <m.div variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }} whileHover={{ scale: 1.02 }} className="p-5 rounded-2xl glass-theme border-theme shadow-theme">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-md bg-theme text-[var(--primary)] border-theme"><FaCode size={18} /></div>
              <h3 className="font-semibold text-lg">Technical</h3>
            </div>
            <div className="space-y-3">
              {TECHNICAL_SKILLS.map((t) => (
                <SkillBar key={t.label} label={t.label} value={t.value} />
              ))}
            </div>
          </m.div>
        </m.div>

        <div className="flex items-center gap-3 mb-4">
          <MotionButton onClick={() => { setShowAll((s) => !s); setModalOpen((m) => !m) }} className="px-4 py-2 bg-[var(--primary)] text-black rounded-md">{showAll ? 'Hide Full List' : 'Show Full Resume List'}</MotionButton>
          <MotionButton onClick={() => copyText('plain')} className="px-4 py-2 bg-theme text-theme border-theme rounded-md">{copied ? 'Copied' : 'Copy Full Resume'}</MotionButton>
        </div>

        {modalOpen && (
          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <button type="button" aria-label="Close skills modal" className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/70 backdrop-blur-sm" onClick={() => { setModalOpen(false); setShowAll(false) }} />
            <m.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.18 }} className="relative max-w-3xl w-full mx-auto p-6 rounded-xl glass-theme ring-1 border-theme shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="skills-modal-title">
              <button type="button" aria-label="Close" onClick={() => { setModalOpen(false); setShowAll(false) }} className="absolute right-3 top-3 text-gray-300 hover:text-white p-1 rounded-md"><HiOutlineX size={20} /></button>

              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 id="skills-modal-title" className="text-xl font-semibold">Full Resume — Skills & Details</h3>
                  <p className="text-sm text-gray-400">Organized sections for quick copying into a resume or application.</p>
                </div>

                <div className="flex items-center gap-2">
                  <MotionButton onClick={() => copyText('plain')} className="px-3 py-1 text-sm bg-[var(--primary)] text-black rounded-md">{copied ? 'Copied' : 'Copy'}</MotionButton>
                  <MotionButton onClick={() => copyText('md')} className="px-3 py-1 text-sm bg-theme border-theme rounded-md">Copy MD</MotionButton>
                  <MotionButton onClick={downloadStructuredText} className="px-3 py-1 text-sm bg-theme border-theme rounded-md">Download</MotionButton>
                </div>
              </div>

              <div className="mt-2 max-h-[64vh] overflow-auto text-sm text-theme">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {parseStructured(STRUCTURED).map((sec) => (
                    <div key={sec.title} className="p-3 rounded-lg bg-theme border-theme">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-200">{sec.title}</h4>
                        <span className="text-xs text-gray-400">{sec.items.length} items</span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {sec.items.map((it) => (
                          <span key={`${sec.title}-${it}`} className="inline-flex items-center px-2 py-0.5 bg-theme rounded-full text-xs text-muted">{it}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </m.div>
          </m.div>
        )}
      </div>
    </m.section>
  )
}
