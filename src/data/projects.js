import cyberedu from '../assets/projects/cyberedu.svg'
import vulnScanner from '../assets/projects/vuln-scanner.svg'
import portfolioImage from '../assets/projects/portfolio.jpg'
import securityDashboard from '../assets/projects/security-dashboard.svg'

export const PROJECTS = [
  {
    id: 'p1',
    title: 'CyberEdu Portal',
    short: 'Learning platform for cybersecurity topics and labs.',
    desc: 'An interactive web portal providing courses, labs, and assessments focused on practical cybersecurity training.',
    tags: ['React', 'Node', 'Full Stack'],
    category: 'Cybersecurity',
    featured: true,
    github: '',
    live: '',
    image: cyberedu,
  },
  {
    id: 'p2',
    title: 'Vulnerability Scanner Tool',
    short: 'Automated scanner for common web vulnerabilities.',
    desc: 'A vulnerability scanner that performs checks for OWASP Top 10 issues and generates reports for remediation.',
    tags: ['Node', 'Security', 'Full Stack'],
    category: 'Cybersecurity',
    featured: false,
    github: '',
    live: '',
    image: vulnScanner,
  },
  {
    id: 'p3',
    title: 'Portfolio Website',
    short: 'This modern personal portfolio showcasing projects and skills.',
    desc: 'A premium, animated developer portfolio built with React and Tailwind, optimized for performance and accessibility.',
    tags: ['React', 'Tailwind', 'UI/UX'],
    category: 'Web Development',
    featured: false,
    github: 'https://github.com/Heer9042',
    live: '',
    image: portfolioImage,
  },
  {
    id: 'p4',
    title: 'Security Dashboard',
    short: 'Threat visualization and security metrics dashboard.',
    desc: 'A dashboard that aggregates logs and visualizes security telemetry for SOC analysts.',
    tags: ['React', 'D3', 'Full Stack'],
    category: 'Full Stack',
    featured: false,
    github: '',
    live: '',
    image: securityDashboard,
  },
]

export const CATEGORIES = ['All', 'Web Development', 'Cybersecurity', 'Full Stack', 'UI/UX']
