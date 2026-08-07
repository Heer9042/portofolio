import { useState } from 'react'
import { Mail, Github, Linkedin } from 'lucide-react'
import { m } from 'framer-motion'
import MotionButton from './ui/MotionButton'
import emailjs from '@emailjs/browser'

// Initialize EmailJS once on app startup (optional: move to App.jsx if preferred)
emailjs.init(import.meta.env.VITE_EMAILJS_USER_ID)

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null) // null | 'success' | 'error'

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form
      )
      setLoading(false)
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setLoading(false)
      setStatus('error')
      console.error('EmailJS error:', err)
    }
  }

  return (
    <m.section id="contact" className="py-12 sm:py-16 md:py-20 w-full overflow-hidden" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}>
      <div className="max-w-6xl 3xl:max-w-8xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          <div className="min-w-0">
            <m.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-heading font-bold mb-4">Get in touch</m.h2>
            <p className="text-sm text-muted mb-6">I am open to collaboration, freelance work, and security-focused projects. Use the form or the quick links to reach me.</p>

            <div className="grid grid-cols-1 gap-3 mb-6">
              <a href="mailto:heerpatel904242@gmail.com" className="flex items-center gap-3 p-4 rounded-xl bg-theme border border-theme hover-theme transition min-w-0">
                <Mail size={18} className="text-indigo-400 shrink-0" />
                <div className="min-w-0">
                  <div className="text-sm font-medium text-theme">Email</div>
                  <div className="text-xs text-muted truncate">heerpatel904242@gmail.com</div>
                </div>
              </a>

              <a href="https://github.com/Heer9042" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-theme border border-theme hover-theme transition min-w-0">
                <Github size={18} className="text-indigo-400 shrink-0" />
                <div className="min-w-0">
                  <div className="text-sm font-medium text-theme">GitHub</div>
                  <div className="text-xs text-muted truncate">github.com/Heer9042</div>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/heerpatel9042/" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-theme border border-theme hover-theme transition min-w-0">
                <Linkedin size={18} className="text-indigo-400 shrink-0" />
                <div className="min-w-0">
                  <div className="text-sm font-medium text-theme">LinkedIn</div>
                  <div className="text-xs text-muted truncate">linkedin.com/in/heerpatel9042</div>
                </div>
              </a>
            </div>

            <div>
              {status === 'success' && <div className="p-3 rounded-md bg-emerald-500/10 text-emerald-400 mb-3">Message sent — I will reply soon.</div>}
              {status === 'error' && <div className="p-3 rounded-md bg-rose-500/10 text-rose-400 mb-3">Failed to send — try again or email directly.</div>}
            </div>
          </div>

          <div className="min-w-0 w-full">
            <m.form variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 sm:gap-4 w-full">
              <label className="sr-only" htmlFor="name">Name</label>
              <m.input id="name" variants={itemVariants} required name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full min-h-[44px] p-3 text-sm sm:text-base rounded-md bg-theme border border-theme text-theme focus:border-indigo-500/40 focus:outline-none transition" />

              <label className="sr-only" htmlFor="email">Email</label>
              <m.input id="email" variants={itemVariants} required name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full min-h-[44px] p-3 text-sm sm:text-base rounded-md bg-theme border border-theme text-theme focus:border-indigo-500/40 focus:outline-none transition" />

              <label className="sr-only" htmlFor="message">Message</label>
              <m.textarea id="message" variants={itemVariants} required name="message" value={form.message} onChange={handleChange} placeholder="Message" rows={6} className="w-full p-3 text-sm sm:text-base rounded-md bg-theme border border-theme text-theme focus:border-indigo-500/40 focus:outline-none transition resize-y min-h-[120px]" />

              <m.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center gap-3">
                <MotionButton as="button" type="submit" disabled={loading} className="w-full sm:w-auto px-6 py-2.5 min-h-[44px] text-sm sm:text-base bg-indigo-600 rounded-md text-white hover:bg-indigo-700 transition disabled:opacity-50 touch-target">{loading ? 'Sending...' : 'Send Message'}</MotionButton>
                <div className="text-xs text-muted text-center sm:text-left">Prefer email? <a href="mailto:heerpatel904242@gmail.com" className="text-[var(--primary)]">Send directly</a></div>
              </m.div>
            </m.form>
          </div>
        </div>
      </div>
    </m.section>
  )
}
