import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { m } from 'framer-motion'

const stats = [
  { label: 'Projects', value: 10, suffix: '+' },
  { label: 'Certificates', value: 10, suffix: '+' },
  { label: 'Skills', value: 11, suffix: '+' },
  { label: 'Experience', value: 1.5, suffix: '+ yrs', live: true, precision: 1 },
]

const EXPERIENCE_START_DATE = new Date('2025-09-01T00:00:00')
const EXPERIENCE_STEP_MONTHS = 5
const EXPERIENCE_STEP_VALUE = 1

function getExperienceValue(referenceDate = new Date()) {
  const monthsElapsed = Math.max(
    0,
    (referenceDate.getFullYear() - EXPERIENCE_START_DATE.getFullYear()) * 12
      + (referenceDate.getMonth() - EXPERIENCE_START_DATE.getMonth())
      + (referenceDate.getDate() >= EXPERIENCE_START_DATE.getDate() ? 0 : -1),
  )

  const steps = Math.floor(monthsElapsed / EXPERIENCE_STEP_MONTHS)
  return Math.min(1.5, EXPERIENCE_STEP_VALUE + (steps * EXPERIENCE_STEP_VALUE))
}

const githubLanguages = ['JavaScript', 'Python', 'PHP', 'HTML', 'Batchfile', 'CSS']

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function CountUp({ value, suffix = '', duration = 1200, precision = 0 }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let frameId
    const start = performance.now()

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1)
      const nextValue = value * progress
      setDisplayValue(precision > 0 ? Number(nextValue.toFixed(precision)) : Math.round(nextValue))
      if (progress < 1) {
        frameId = requestAnimationFrame(tick)
      }
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [value, duration, precision])

  return (
    <>
      {displayValue}
      {suffix}
    </>
  )
}

CountUp.propTypes = {
  value: PropTypes.number.isRequired,
  suffix: PropTypes.string,
  duration: PropTypes.number,
  precision: PropTypes.number,
}

export default function About() {
  const [experienceValue, setExperienceValue] = useState(() => getExperienceValue())

  useEffect(() => {
    const updateExperience = () => setExperienceValue(getExperienceValue())

    updateExperience()
    const timer = window.setInterval(updateExperience, 24 * 60 * 60 * 1000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <m.section id="about" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-black/0 via-black/20 to-black/0 w-full overflow-hidden" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}>
      <div className="max-w-6xl 3xl:max-w-8xl mx-auto px-4 sm:px-6 w-full">
        <m.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-heading font-bold mb-6 sm:mb-8 md:mb-12">About</m.h2>

        {/* Main intro + stats grid */}
        <m.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 mb-12">
          {/* Bio Section */}
          <m.div variants={itemVariants} className="md:col-span-6 p-5 sm:p-8 rounded-2xl border-theme hover-theme bg-theme text-theme transition">
            <p className="text-xs uppercase tracking-[0.3em] text-indigo-400 mb-3">Profile</p>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">About Heer Patel</h3>
            <p className="text-sm sm:text-base leading-relaxed mb-4">
              I’m Heer Patel, an MCA student (having completed my BCA) focused on cybersecurity and modern web development. I build small projects, learn from real examples, and keep improving by working through practical problems.
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              My GitHub projects show a mixed stack: JavaScript, Python, PHP, HTML, CSS, and Batchfile. I like creating websites that are safe, simple, and easy to use.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {githubLanguages.map((lang) => (
                <span key={lang} className="px-3 py-1 text-xs sm:text-sm rounded-full bg-theme border-theme text-muted">
                  {lang}
                </span>
              ))}
            </div>
          </m.div>

          {/* Skills & Highlights */}
          <m.div variants={itemVariants} className="md:col-span-6 space-y-3">
            <div className="p-4 sm:p-5 rounded-xl border-theme hover-theme bg-theme text-theme transition">
              <p className="text-xs sm:text-sm uppercase tracking-widest text-indigo-400 font-semibold mb-2">What I Know</p>
              <p className="text-sm sm:text-base">Basic web building (HTML, CSS, JavaScript), React, Python, PHP, and security tools used for learning and testing.</p>
            </div>
            <div className="p-4 sm:p-5 rounded-xl border-theme hover-theme bg-theme text-theme transition">
              <p className="text-xs sm:text-sm uppercase tracking-widest text-violet-400 font-semibold mb-2">What I Care About</p>
              <p className="text-sm sm:text-base">Making websites safe, fast, and easy for people to use.</p>
            </div>
            <div className="p-4 sm:p-5 rounded-xl border-theme hover-theme bg-theme text-theme transition">
              <p className="text-xs sm:text-sm uppercase tracking-widest text-cyan-400 font-semibold mb-2">How I Work</p>
              <p className="text-sm sm:text-base">I learn quickly, try things myself, and fix problems step by step.</p>
            </div>
          </m.div>
        </m.div>

        {/* Stats Section */}
        <m.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {stats.map((s) => (
            <m.div key={s.label} variants={itemVariants} whileHover={{ y: -4 }} className="group p-3 sm:p-4 md:p-6 rounded-xl border-theme bg-theme text-theme transition cursor-default shadow-theme min-w-0">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold truncate">
                <CountUp value={s.live ? experienceValue : s.value} suffix={s.suffix} precision={s.precision} />
              </p>
              <p className="text-xs sm:text-sm text-muted mt-2 transition">{s.label}</p>
            </m.div>
          ))}
        </m.div>
      </div>
    </m.section>
  )
}
