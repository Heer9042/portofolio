import { useEffect, useMemo, useState } from 'react'
import { CERTIFICATES } from '../data/certificates'
import { m, AnimatePresence } from 'framer-motion'
import { BadgeCheck } from 'lucide-react'
import CertificateModal from './CertificateModal'

const pageSize = 6

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -8 },
}

export default function Certificates() {
  const [page, setPage] = useState(1)
  const [active, setActive] = useState(null)
  const [filter, setFilter] = useState('All')

  const categories = useMemo(() => ['All', ...new Set(CERTIFICATES.map((cert) => cert.category || 'Other'))], [])

  const filteredCertificates = useMemo(() => {
    if (filter === 'All') return CERTIFICATES
    return CERTIFICATES.filter((cert) => cert.category === filter)
  }, [filter])

  const totalPages = Math.max(1, Math.ceil(filteredCertificates.length / pageSize))

  const current = useMemo(() => {
    const start = (page - 1) * pageSize
    return filteredCertificates.slice(start, start + pageSize)
  }, [page, filteredCertificates])

  const featured = useMemo(() => CERTIFICATES.find((cert) => cert.verified) || CERTIFICATES[0], [])

  const stats = useMemo(() => [
    { label: 'Total', value: CERTIFICATES.length },
    { label: 'Verified', value: CERTIFICATES.filter((cert) => cert.verified).length },
    { label: 'Categories', value: categories.length - 1 },
  ], [categories.length])

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') setActive(null)
    }

    if (active) {
      window.addEventListener('keydown', onKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [active])

  function go(n) {
    const next = Math.max(1, Math.min(totalPages, n))
    setPage(next)
  }

  function selectFilter(category) {
    setFilter(category)
    setPage(1)
  }

  return (
    <section id="certificates" className="py-12 sm:py-16 md:py-20 relative overflow-hidden w-full">
      <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.22),transparent_50%)]" />
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="max-w-6xl 3xl:max-w-8xl mx-auto px-4 sm:px-6 relative w-full">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-6 sm:mb-8 md:mb-10">
          <div className="max-w-2xl min-w-0">
            <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-indigo-400 mb-3">Learning proof</p>
            <m.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-heading-lg font-bold text-white">
              Certificates
            </m.h2>
            <p className="mt-3 text-sm sm:text-base text-gray-300 max-w-xl">
              A curated view of your learning milestones, with quick filters and a cleaner detail view for each certificate.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="min-w-[110px] rounded-2xl border-theme bg-theme px-4 py-3">
                  <div className="text-2xl font-bold text-theme">{stat.value}</div>
                  <div className="text-xs uppercase tracking-[0.25em] text-muted mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {featured && (
            <m.button
              type="button"
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setActive(featured)}
              className="group w-full lg:w-[360px] text-left rounded-3xl border-theme bg-theme p-4 sm:p-5 shadow-theme"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-[0.3em] text-cyan-300">Featured</span>
                {featured.verified && <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] text-emerald-300 border border-emerald-500/20">Verified</span>}
              </div>
              <div className="flex gap-4">
                <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-2xl border-theme bg-theme">
                  <img src={featured.image} alt={featured.title} className="h-full w-full object-cover" />
                  <div className="absolute right-2 top-2 rounded-full bg-emerald-500/90 p-1.5 shadow-lg shadow-emerald-500/20">
                    <BadgeCheck size={14} className="text-white" />
                  </div>
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-theme group-hover:text-cyan-600 transition">{featured.title}</h3>
                  <p className="mt-1 text-sm text-muted line-clamp-3">{featured.desc}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.25em] text-muted">Open details</p>
                </div>
              </div>
            </m.button>
          )}
        </div>

        <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8 overflow-x-auto pb-2 -mx-1 px-1">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => selectFilter(category)}
              className={`px-3 sm:px-4 py-2 min-h-[44px] rounded-full text-xs sm:text-sm whitespace-nowrap shrink-0 transition border touch-target ${filter === category ? 'bg-indigo-600 text-white border-indigo-500/40' : 'bg-theme text-muted border-theme hover-theme'}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="relative">
          <AnimatePresence mode="popLayout">
            <m.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} key={page} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {current.map((c) => (
                <m.button
                  type="button"
                  key={c.id}
                  variants={itemVariants}
                  whileHover={{ y: -6, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="text-left p-4 rounded-2xl bg-theme border-theme shadow-theme cursor-pointer transition hover-theme w-full min-w-0"
                  onClick={() => setActive(c)}
                >
                    <div className="relative h-44 sm:h-52 overflow-hidden rounded-2xl mb-4 bg-theme">
                    <img src={c.image} alt={c.title} loading="lazy" className="w-full h-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
                    
                    <div className="absolute right-3 top-3 rounded-full bg-emerald-500/90 p-2 shadow-lg shadow-emerald-500/20">
                      <BadgeCheck size={16} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="mb-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs text-muted bg-theme border border-theme">{c.category}</span>
                    </div>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-theme font-semibold text-lg leading-snug">{c.title}</h3>
                        <span className="text-[11px] uppercase tracking-[0.25em] text-muted pt-1">Open</span>
                    </div>
                      <p className="text-sm text-muted mt-1">{c.issuer}</p>
                      <p className="text-sm text-muted mt-3 line-clamp-2">{c.desc}</p>
                  </div>
                </m.button>
              ))}
            </m.div>
          </AnimatePresence>
        </div>

        {/* Pagination UI */}
        <div className="mt-5 text-xs sm:text-sm text-gray-300 text-center">{
          (() => {
            const start = filteredCertificates.length === 0 ? 0 : (page - 1) * pageSize + 1
            const end = Math.min(page * pageSize, filteredCertificates.length)
            return `Showing ${start}-${end} of ${filteredCertificates.length} certificates`
          })()
        }</div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <button type="button" onClick={() => go(page - 1)} disabled={page === 1} className={`px-2 sm:px-3 py-1.5 text-sm rounded transition ${page === 1 ? 'bg-white/10 text-gray-500' : 'bg-white/5 text-gray-200 hover:bg-white/10'}`}>Previous</button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button type="button" key={i} onClick={() => go(i + 1)} className={`px-2.5 sm:px-3 py-1.5 text-sm rounded transition ${page === i + 1 ? 'bg-indigo-600 text-white' : 'bg-white/5 text-gray-200 hover:bg-white/10'}`}>{i + 1}</button>
          ))}

          <button type="button" onClick={() => go(page + 1)} disabled={page === totalPages} className={`px-2 sm:px-3 py-1.5 text-sm rounded transition ${page === totalPages ? 'bg-white/10 text-gray-500' : 'bg-white/5 text-gray-200 hover:bg-white/10'}`}>Next</button>
        </div>

        <CertificateModal open={!!active} onClose={() => setActive(null)} cert={active} />
      </div>
    </section>
  )
}
