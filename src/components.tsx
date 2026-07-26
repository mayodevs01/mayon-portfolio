import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  ArrowRight,
  Check,
  Github,
  Instagram,
  Linkedin,
  Menu,
  X,
} from 'lucide-react'

export function ArrowLink({
  to,
  children,
  variant = 'primary',
  className = '',
}: {
  to: string
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
}) {
  return (
    <Link className={`button button-${variant} ${className}`} to={to}>
      <span>{children}</span><ArrowRight size={16} aria-hidden="true" />
    </Link>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="eyebrow"><span />{children}</div>
}

export function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  useEffect(() => setOpen(false), [location.pathname])
  const links = ['Work', 'Services', 'Industries', 'About', 'Contact']
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link to="/" className="brand" aria-label="Mayon home">MAYON</Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((label) => (
            <NavLink key={label} to={`/${label.toLowerCase()}`}>{label}</NavLink>
          ))}
        </nav>
        <ArrowLink to="/contact" className="header-cta">Start a Project</ArrowLink>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {links.map((label) => <NavLink key={label} to={`/${label.toLowerCase()}`}>{label}</NavLink>)}
          <ArrowLink to="/contact">Start a Project</ArrowLink>
        </nav>
      )}
    </header>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand" to="/">MAYON</Link>
          <p>Websites and software<br />built for real businesses.</p>
        </div>
        <div><h3>Navigation</h3><Link to="/work">Work</Link><Link to="/services">Services</Link><Link to="/industries">Industries</Link><Link to="/about">About</Link><Link to="/contact">Contact</Link></div>
        <div><h3>Services</h3><Link to="/services">Websites</Link><Link to="/services">Ecommerce</Link><Link to="/services">Booking Systems</Link><Link to="/services">SaaS Development</Link></div>
        <div className="footer-connect">
          <h3>Connect</h3>
          <a href="mailto:mayodevs01@gmail.com">mayodevs01@gmail.com</a>
          <div className="social-row">
            <a href="https://github.com/" aria-label="GitHub"><Github size={17} /></a>
            <a href="https://linkedin.com/" aria-label="LinkedIn"><Linkedin size={17} /></a>
            <a href="https://instagram.com/" aria-label="Instagram"><Instagram size={17} /></a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom"><span>© 2026 Mayon. All rights reserved.</span><span>Built with purpose <b>♥</b></span></div>
    </footer>
  )
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return <><Header /><main>{children}</main><Footer /></>
}

export function SectionIntro({ eyebrow, title, text }: { eyebrow: string; title: ReactNode; text?: string }) {
  return (
    <div className="section-intro">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}

export function FinalCta() {
  return (
    <section className="final-cta">
      <div className="container cta-grid">
        <div>
          <h2>Have a business?<br />Let’s build something<br />that works for it.</h2>
          <ul>
            {['Clear communication', 'On-time delivery', 'Clean and modern design', 'Scalable and maintainable code'].map(item => <li key={item}><Check size={16} />{item}</li>)}
          </ul>
          <div className="button-row">
            <ArrowLink to="/contact">Start a Project</ArrowLink>
            <a className="button button-secondary" href="mailto:mayodevs01@gmail.com">Email Me</a>
          </div>
        </div>
        <div className="cta-visual" aria-hidden="true">
          <div className="dashboard-panel">
            <div className="dash-top"><i /><i /><i /><span /></div>
            <div className="dash-grid"><b /><b /><b /></div>
            <div className="dash-body"><div /><div /><div /><div /></div>
          </div>
          <div className="phone-panel"><span /><b /><b /><b /><div /></div>
        </div>
      </div>
    </section>
  )
}
