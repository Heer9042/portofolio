import PropTypes from 'prop-types'
import { m } from 'framer-motion'
import { BadgeCheck } from 'lucide-react'

export default function CertificateModal({ open, onClose, cert }) {
  if (!open || !cert) return null
  const verificationLink = cert.link || cert.image

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <button type="button" aria-label="Close certificate modal" onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <m.div
        initial={{ scale: 0.96, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 12 }}
        transition={{ duration: 0.2 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="certificate-modal-title"
        className="relative z-10 w-full max-w-5xl max-h-[95dvh] sm:max-h-[90dvh] overflow-y-auto overflow-x-hidden rounded-t-3xl sm:rounded-3xl border-theme bg-theme shadow-theme"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.12),transparent_36%)] pointer-events-none" />
        <button type="button" onClick={onClose} aria-label="Close" className="absolute right-3 top-3 sm:right-4 sm:top-4 z-20 rounded-full border border-theme bg-theme px-3 py-2 min-h-[44px] text-sm text-muted transition hover-theme touch-target">
          Close
        </button>

        <div className="relative grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] min-w-0">
          <div className="p-4 sm:p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-theme bg-theme min-w-0">
            <div className="relative overflow-hidden rounded-3xl border border-theme bg-theme">
              <img src={cert.image} alt={cert.title} className="h-auto w-full object-contain max-h-[50vh] sm:max-h-[60vh] lg:max-h-[70vh] mx-auto" />
              <div className="absolute right-4 top-4 rounded-full bg-emerald-500/90 p-2 shadow-lg shadow-emerald-500/20">
                <BadgeCheck size={18} className="text-white" />
              </div>
            </div>
          </div>

          <div className="relative p-4 sm:p-6 lg:p-8 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-4 pr-16 sm:pr-0">
              <span className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-cyan-600 border border-theme">{cert.category}</span>
              {cert.verified && <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-emerald-700 border border-emerald-200">Verified</span>}
              <span className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-muted border border-theme">{cert.date}</span>
            </div>

            <h3 id="certificate-modal-title" className="text-xl sm:text-2xl md:text-3xl font-bold text-theme leading-tight break-words">
              {cert.title}
            </h3>
            <p className="mt-2 text-sm sm:text-base text-muted">{cert.issuer}</p>

            <div className="mt-6 rounded-2xl border border-theme bg-theme p-4 sm:p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-muted mb-3">About this certificate</p>
              <p className="text-sm sm:text-base leading-relaxed text-theme">{cert.desc}</p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
              {cert.verified ? (
                <a href={verificationLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 min-h-[44px] text-sm font-medium text-white transition hover:bg-indigo-500 touch-target">
                  View verification
                </a>
              ) : (
                <span className="inline-flex items-center justify-center rounded-xl border border-theme bg-theme px-4 py-2.5 min-h-[44px] text-sm text-muted">
                  No external verification link
                </span>
              )}

              <button type="button" onClick={onClose} className="inline-flex items-center justify-center rounded-xl border border-theme bg-theme px-4 py-2.5 min-h-[44px] text-sm text-muted transition hover-theme touch-target">
                Back to gallery
              </button>
            </div>
          </div>
        </div>
      </m.div>
    </div>
  )
}

CertificateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cert: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    issuer: PropTypes.string.isRequired,
    date: PropTypes.string,
    desc: PropTypes.string.isRequired,
    verified: PropTypes.bool,
    link: PropTypes.string,
    category: PropTypes.string,
  }),
}
