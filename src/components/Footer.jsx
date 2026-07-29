import { m } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <m.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="
        py-12 mt-16 border-t
        border-slate-200 dark:border-white/10
        bg-white dark:bg-[#0a0f1a]
      "
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">

          {/* LEFT */}
          <m.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Heer Patel
            </h2>

            <p className="text-sm text-slate-600 dark:text-gray-400 mt-2 max-w-md">
              Full Stack Developer & Cybersecurity enthusiast focused on web
              security, tools, and building reliable applications.
            </p>

            {/* SOCIAL LINKS */}
            <div className="mt-5 flex items-center gap-4">

              <a
                href="https://github.com/Heer9042"
                target="_blank"
                rel="noreferrer"
                className="
                  flex items-center gap-2 text-sm
                  text-slate-500 dark:text-gray-400
                  hover:text-emerald-500 transition
                "
              >
                <Github size={16} />
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/heerpatel9042/"
                target="_blank"
                rel="noreferrer"
                className="
                  flex items-center gap-2 text-sm
                  text-slate-500 dark:text-gray-400
                  hover:text-emerald-500 transition
                "
              >
                <Linkedin size={16} />
                LinkedIn
              </a>

              <a
                href="mailto:heerpatel904242@gmail.com"
                className="
                  flex items-center gap-2 text-sm
                  text-slate-500 dark:text-gray-400
                  hover:text-emerald-500 transition
                "
              >
                <Mail size={16} />
                Email
              </a>

            </div>
          </m.div>

          {/* RIGHT */}
          <m.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
              Quick Links
            </h4>

            <div className="flex flex-col gap-2 text-sm">

              {[
                "home",
                "about",
                "skills",
                "projects",
                "certificates",
                "contact",
              ].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="
                    text-slate-500 dark:text-gray-400
                    hover:text-emerald-500 transition
                  "
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              ))}

            </div>
          </m.div>
        </div>

        {/* BOTTOM BAR */}
        <div className="
          pt-6 border-t
          border-slate-200 dark:border-white/10
          flex flex-col sm:flex-row
          items-center justify-between gap-4
        ">

          <p className="
            text-xs sm:text-sm
            text-slate-500 dark:text-gray-400
          " suppressHydrationWarning>
            © {new Date().getFullYear()} Heer Patel. All rights reserved.
          </p>

          {/* BACK TO TOP */}
          <button
            type="button"
            onClick={() => {
              const el =
                document.getElementById("top") ||
                document.getElementById("home");

              if (el) el.scrollIntoView({ behavior: "smooth" });
              else window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="
              px-4 py-2 rounded-full
              bg-slate-100 dark:bg-white/5
              text-slate-700 dark:text-gray-300
              border border-slate-200 dark:border-white/10
              hover:border-emerald-400 dark:hover:border-emerald-400
              hover:text-emerald-500 transition
            "
          >
            ↑ Back to top
          </button>

        </div>
      </div>
    </m.footer>
  );
}