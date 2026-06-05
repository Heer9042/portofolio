import React from 'react'
import { m } from 'framer-motion'

const TESTS = [
  { name: 'Alice', text: 'Great work and communication.' },
  { name: 'Bob', text: 'Professional and timely delivery.' },
  { name: 'Charlie', text: 'Strong security-minded approach.' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <m.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">Testimonials</m.h2>
        <m.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
          {TESTS.map((t) => (
            <m.div key={t.name} variants={itemVariants} whileHover={{ scale: 1.02 }} className="flex-shrink-0 w-full sm:min-w-[300px] md:min-w-[320px] p-4 sm:p-6 rounded-xl bg-black/40 border border-white/5 cursor-pointer transition hover:border-indigo-500/40 snap-center">
              <p className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4 line-clamp-3">"{t.text}"</p>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs sm:text-sm font-semibold text-white">{t.name.slice(0, 1)}</span>
                </div>
                <div>
                  <p className="text-sm sm:text-base font-semibold text-white">{t.name}</p>
                </div>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  )
}
