import { useState, useMemo, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import MotionButton from './ui/MotionButton'
import { PROJECTS as LOCAL_PROJECTS } from '../data/projects'
import PropTypes from 'prop-types'

function ProjectCard({ p }) {
  return (
    <m.div whileHover={{ scale: 1.03, translateY: -6 }} whileTap={{ scale: 0.995 }} layout className="p-4 rounded-xl bg-theme border-theme shadow-theme hover-theme">
        <div className="relative rounded-md overflow-hidden h-40 bg-gradient-to-tr from-indigo-700 to-pink-600 mb-3">
          <img src={p.image} alt={p.title} className="w-full h-full object-cover brightness-90" />
        </div>
      <div>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-white font-semibold">{p.title}</h3>
            <p className="text-sm text-muted">{p.short}</p>
          </div>
        </div>

            <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-2">
            {p.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded-full bg-theme border-theme text-muted">{t}</span>
            ))}
          </div>
          <div className="flex gap-2">
            <MotionButton as="a" href={p.github || '#'} className="px-3 py-1 rounded-md text-sm bg-theme border-theme text-muted">Code</MotionButton>
            <MotionButton as="a" href={p.live || '#'} className="px-3 py-1 bg-indigo-600 rounded-md text-sm text-white">Live</MotionButton>
          </div>
        </div>
      </div>
    </m.div>
  )
}

ProjectCard.propTypes = {
  p: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    short: PropTypes.string,
    desc: PropTypes.string,
    image: PropTypes.string.isRequired,
    category: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    github: PropTypes.string,
    live: PropTypes.string,
    featured: PropTypes.bool,
  }).isRequired,
}

export default function ProjectsAdvanced() {
  const [filter, setFilter] = useState('All')
  const [sortOrder, setSortOrder] = useState('Newest')
  const [page, setPage] = useState(1)
  const pageSize = 6
  const [projects, setProjects] = useState(LOCAL_PROJECTS)

  const filtered = useMemo(() => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)), [filter, projects])

  const sorted = useMemo(() => {
    if (sortOrder === 'Popular') return [...filtered].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    if (sortOrder === 'Newest') return [...filtered].sort((a, b) => (b.id > a.id ? 1 : -1))
    return filtered
  }, [filtered, sortOrder])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize)

  const featured = useMemo(() => projects.find((p) => p.featured) || projects[0], [projects])

  // derive categories from projects (fallback to 'All')
  const CATEGORIES = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category || 'Other'))
    return ['All', ...Array.from(cats)]
  }, [projects])

  useEffect(() => {
    let cancelled = false
    async function fetchGitHub() {
      try {
        const res = await fetch('https://api.github.com/users/Heer9042/repos?per_page=100')
        if (!res.ok) throw new Error('GitHub API error')
        const data = await res.json()
        const mapped = data
          .filter((r) => !r.fork)
          .map((r) => ({
            id: r.id,
            title: r.name,
            short: r.description || '',
            desc: r.description || '',
            image: `https://opengraph.githubassets.com/1/${r.full_name}`,
            category: r.language || 'Other',
            tags: ([...(r.topics || [])].concat(r.language || [])).filter(Boolean),
            github: r.html_url,
            live: r.homepage || (r.has_pages ? `https://${r.owner.login}.github.io/${r.name}` : ''),
            featured: r.stargazers_count > 0 || (r.topics || []).includes('featured'),
          }))
        if (!cancelled && mapped.length) setProjects(mapped)
      } catch (err) {
        console.warn('Failed to fetch GitHub repos, using local projects', err)
        // keep local projects as fallback
      }
    }
    fetchGitHub()
    return () => { cancelled = true }
  }, [])

  function goToPage(n) {
    setPage(n)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <m.section id="projects" className="py-16 sm:py-20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-0">
          <div>
            <m.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-2xl sm:text-3xl font-bold text-theme">Projects</m.h2>
            {featured && (
              <p className="mt-2 text-sm text-muted">
                Spotlight: <span className="text-white font-medium">{featured.title}</span> from your GitHub profile
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <select value={sortOrder} onChange={(e) => { setSortOrder(e.target.value); setPage(1) }} className="flex-1 sm:flex-none bg-theme text-xs sm:text-sm p-2.5 rounded text-muted border-theme focus:border-indigo-500/40 transition cursor-pointer">
              <option>Newest</option>
              <option>Popular</option>
            </select>
          </div>
        </div>

        <div className="flex gap-1.5 sm:gap-2 mb-6 sm:mb-8 overflow-auto pb-2">
          {CATEGORIES.map((c) => (
            <button type="button" key={c} onClick={() => { setFilter(c); setPage(1) }} className={`px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full transition whitespace-nowrap ${filter === c ? 'bg-indigo-600 text-white' : 'bg-theme text-muted hover-theme border-theme'}`}>{c}</button>
          ))}
        </div>

        <m.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <AnimatePresence>
            {paginated.map((p) => (
              <m.div key={p.id} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}>
                <ProjectCard p={p} />
              </m.div>
            ))}
          </AnimatePresence>
        </m.div>

        {/* Showing X of Y counter */}
        <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-300 text-center">{
            (() => {
            const start = (page - 1) * pageSize + 1
            const end = Math.min(page * pageSize, sorted.length)
            return `Showing ${start}-${end} of ${sorted.length} projects`
          })()
        }</div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {Array.from({ length: totalPages }).map((_, i) => (
                <button type="button" key={i} onClick={() => goToPage(i + 1)} className={`px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded transition ${page === i + 1 ? 'bg-indigo-600 text-white' : 'bg-theme text-muted hover-theme border-theme'}`}>{i + 1}</button>
            ))}
          </div>
        )}

        {/* Show more / show less */}
        {page < totalPages ? (
          <div className="mt-6 sm:mt-8 flex justify-center">
            <button type="button" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base rounded bg-indigo-600 text-white hover:bg-indigo-700 transition">Show more</button>
          </div>
        ) : (
          sorted.length > pageSize && (
            <div className="mt-6 sm:mt-8 flex justify-center">
              <button type="button" onClick={() => setPage(1)} className="px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base rounded bg-white/5 text-gray-200 hover:bg-white/10 transition">Show less</button>
            </div>
          )
        )}
      </div>
    </m.section>
  )
}
