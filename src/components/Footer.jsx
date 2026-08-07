import { m } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const links = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "certificates", label: "Certificates" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <m.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-10 sm:py-12 mt-12 sm:mt-16 border-t border-white/10 bg-transparent text-theme w-full overflow-hidden"
    >
      <div className="max-w-6xl 3xl:max-w-8xl mx-auto px-4 sm:px-6 w-full">
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10 items-start">
          {/* LEFT: Bio & Socials */}
          <m.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-7 min-w-0"
          >
            <h2 className="text-xl font-bold" style={{ color: 'var(--primary)' }}>
              Heer Patel
            </h2>

            <p className="text-sm text-muted mt-2 max-w-md leading-relaxed">
              MCA Student & Cybersecurity Enthusiast focused on web security, ethical hacking, and building reliable applications.
            </p>

            {/* SOCIAL LINKS */}
            <div className="mt-5 flex flex-wrap items-center gap-5">
              <a
                href="https://github.com/Heer9042"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                className="flex items-center gap-2 text-sm text-muted hover:text-[var(--primary)] transition"
              >
                <Github size={16} aria-hidden />
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/heerpatel9042/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                className="flex items-center gap-2 text-sm text-muted hover:text-[var(--primary)] transition"
              >
                <Linkedin size={16} aria-hidden />
                LinkedIn
              </a>

              <a
                href="mailto:heerpatel904242@gmail.com"
                aria-label="Send email"
                className="flex items-center gap-2 text-sm text-muted hover:text-[var(--primary)] transition"
              >
                <Mail size={16} aria-hidden />
                Email
              </a>
            </div>
          </m.div>

          {/* RIGHT: Quick Links in Horizontal Row Layout */}
          <m.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-5 min-w-0"
          >
            <h4 className="text-sm font-semibold uppercase tracking-wider text-theme mb-4">
              Quick Links
            </h4>

            {/* Quick Links displayed in a horizontal row */}
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {links.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-muted hover:text-[var(--primary)] transition py-1 inline-flex items-center font-medium"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </m.div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-muted">
            © {new Date().getFullYear()} Heer Patel. All rights reserved.
          </p>

          {/* BACK TO TOP */}
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("top") || document.getElementById("home");
              if (el) el.scrollIntoView({ behavior: "smooth" });
              else window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-muted hover:text-[var(--primary)] transition flex items-center gap-1.5 text-xs sm:text-sm font-medium cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp size={14} aria-hidden />
            Back to top
          </button>
        </div>
      </div>
    </m.footer>
  );
}