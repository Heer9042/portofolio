import { useState, useMemo, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import MotionButton from './ui/MotionButton'
import { PROJECTS as LOCAL_PROJECTS } from '../data/projects'
import PropTypes from 'prop-types'

function ProjectCard({ p }) {
  return (
    <m.div whileHover={{ scale: 1.03, translateY: -6 }} whileTap={{ scale: 0.995 }} layout className="p-4 rounded-xl bg-theme border-theme shadow-theme hover-theme h-full flex flex-col min-w-0">
        <div className="relative rounded-md overflow-hidden h-36 sm:h-40 bg-gradient-to-tr from-indigo-700 to-pink-600 mb-3 shrink-0">
          <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover brightness-90" />
        </div>
      <div className="flex flex-col flex-1 min-w-0">
        <div className="min-w-0">
            <h3 className="text-white font-semibold truncate">{p.title}</h3>
            <p className="text-sm text-muted line-clamp-2">{p.short}</p>
        </div>

        <div className="mt-auto pt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1.5 sm:gap-2 min-w-0">
            {p.tags.slice(0, 4).map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded-full bg-theme border-theme text-muted whitespace-nowrap">{t}</span>
            ))}
          </div>
          <div className="flex gap-2 shrink-0">
            <MotionButton as="a" href={p.github || '#'} className="px-3 py-2 min-h-[44px] rounded-md text-sm bg-theme border-theme text-muted touch-target">Code</MotionButton>
            <MotionButton as="a" href={p.live || '#'} className="px-3 py-2 min-h-[44px] bg-indigo-600 rounded-md text-sm text-white touch-target">Live</MotionButton>
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
    if (sortOrder === 'Popular') return filtered.toSorted((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    if (sortOrder === 'Newest') return filtered.toSorted((a, b) => (b.id > a.id ? 1 : -1))
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

    async function fetchGitHubProjects() {
      try {
        const response = await fetch('https://api.github.com/users/Heer9042/repos?per_page=100&sort=updated')
        if (!response.ok) throw new Error('GitHub API error')

        const repos = await response.json()
        const mapped = repos
          .filter((repo) => !repo.fork)
          .map((repo) => ({
            id: repo.id,
            title: repo.name,
            short: repo.description || 'GitHub repository',
            desc: repo.description || 'GitHub repository',
            image: `https://opengraph.githubassets.com/1/${repo.full_name}`,
            category: repo.language || 'Other',
            tags: [repo.language, ...(repo.topics || [])].filter(Boolean),
            github: repo.html_url,
            live: repo.homepage || '',
            featured: repo.stargazers_count > 0 || (repo.topics || []).includes('featured'),
          }))

        if (!cancelled && mapped.length) {
          setProjects(mapped)
        }
      } catch (error) {
        console.warn('GitHub projects unavailable, using local portfolio data', error)
      }
    }

    fetchGitHubProjects()

    return () => {
      cancelled = true
    }
  }, [])

  function goToPage(n) {
    setPage(n)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <m.section id="projects" className="py-12 sm:py-16 md:py-20 w-full overflow-hidden" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}>
      <div className="max-w-6xl 3xl:max-w-8xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 md:mb-8 gap-3">
          <div className="min-w-0">
            <m.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-heading font-bold text-theme">Projects</m.h2>
            {featured && (
              <p className="mt-2 text-sm text-muted break-words">
                Spotlight: <span className="text-white font-medium">{featured.title}</span> from your GitHub profile
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <select value={sortOrder} onChange={(e) => { setSortOrder(e.target.value); setPage(1) }} aria-label="Sort projects" className="w-full sm:w-auto min-h-[44px] bg-theme text-xs sm:text-sm p-2.5 rounded text-muted border-theme focus:border-indigo-500/40 transition cursor-pointer">
              <option>Newest</option>
              <option>Popular</option>
            </select>
          </div>
        </div>

        <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6 md:mb-8 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin">
          {CATEGORIES.map((c) => (
            <button type="button" key={c} onClick={() => { setFilter(c); setPage(1) }} className={`px-2.5 sm:px-3 py-2 min-h-[44px] text-xs sm:text-sm rounded-full transition whitespace-nowrap shrink-0 touch-target ${filter === c ? 'bg-indigo-600 text-white' : 'bg-theme text-muted hover-theme border-theme'}`}>{c}</button>
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
            <button type="button" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="w-full sm:w-auto px-4 sm:px-5 py-2.5 min-h-[44px] text-sm sm:text-base rounded bg-indigo-600 text-white hover:bg-indigo-700 transition touch-target">Show more</button>
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
