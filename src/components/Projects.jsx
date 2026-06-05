import React, { useState } from 'react'
import { m } from 'framer-motion'

const SAMPLE = [
  { id: 1, title: 'CyberEdu Portal', tags: ['React', 'Node'], desc: 'Learning platform focused on cybersecurity topics.' },
  { id: 2, title: 'Vulnerability Scanner', tags: ['Node', 'Security'], desc: 'CLI + web app to scan common vulnerabilities.' },
  { id: 3, title: 'Portfolio Website', tags: ['React', 'Tailwind'], desc: 'This personal portfolio with modern animations.' },
  { id: 4, title: 'Security Dashboard', tags: ['React', 'D3'], desc: 'Threat visualization and metrics dashboard.' },
]

const TAGS = ['All', 'React', 'Node', 'Security', 'Tailwind']

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const items = SAMPLE.filter((p) => filter === 'All' || p.tags.includes(filter))

  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-6">Projects</h2>

        <div className="flex gap-2 mb-6">
          {TAGS.map((t) => (
            <button type="button" key={t} onClick={() => setFilter(t)} className={`px-3 py-1 rounded-full ${filter===t? 'bg-indigo-600':'bg-white/5'}`}>{t}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p) => (
            <m.div key={p.id} whileHover={{ scale: 1.02 }} className="p-4 rounded-xl bg-black/40 border border-white/5">
              <div className="h-40 bg-gradient-to-tr from-indigo-700 to-pink-600 rounded-md mb-3 flex items-end p-3 text-white">{p.title}</div>
              <p className="text-gray-300 text-sm">{p.desc}</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex gap-2 text-xs">
                  {p.tags.map((t) => <span key={t} className="px-2 py-1 bg-white/5 rounded-full">{t}</span>)}
                </div>
                <div className="flex gap-2">
                  <a className="px-3 py-1 bg-white/5 rounded-md text-sm">Code</a>
                  <a className="px-3 py-1 bg-indigo-600 rounded-md text-sm text-white">Live</a>
                </div>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  )
}
