import { useEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Bot, Braces, CircleDot, Command, MousePointer2, Orbit, WandSparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const contactLink = 'mailto:mayodevs01@gmail.com?subject=Project%20Inquiry%20%E2%80%94%20Mayon'

const systems = [
  { index: '01', title: 'Brand signals', label: 'Creative direction', copy: 'Identity systems, campaign language, content and art direction that give an early-stage brand a point of view.', icon: WandSparkles },
  { index: '02', title: 'Digital products', label: 'Web & SaaS', copy: 'Launch sites, interfaces and MVPs that feel like products from the first interaction—not a collection of pages.', icon: Braces },
  { index: '03', title: 'Intelligent ops', label: 'AI & automation', copy: 'Connected agents, lead routes and repeatable workflows designed to remove the work that holds a business back.', icon: Bot },
]

const experiments = [
  { code: 'M-01', tag: 'Launch system', title: 'A product launch that starts with a signal.', detail: 'An identity, campaign kit and conversion page designed to make a new offer feel inevitable.', type: 'launch' },
  { code: 'M-02', tag: 'Creator engine', title: 'A content operation with its own gravity.', detail: 'A modular publishing system for turning one idea into weeks of coordinated output.', type: 'content' },
  { code: 'M-03', tag: 'Lead OS', title: 'A lead system that moves before you do.', detail: 'Capture, qualify, enrich and route demand through a workflow that keeps context intact.', type: 'leads' },
]

function SignalEngine() {
  const engine = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = engine.current
    if (!element) return
    const pointer = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect()
      element.style.setProperty('--px', `${((event.clientX - rect.left) / rect.width - 0.5) * 2}`)
      element.style.setProperty('--py', `${((event.clientY - rect.top) / rect.height - 0.5) * 2}`)
    }
    element.addEventListener('pointermove', pointer)
    return () => element.removeEventListener('pointermove', pointer)
  }, [])
  return <div className="signal-engine" ref={engine} aria-hidden="true">
    <img className="engine-film" src="/assets/signal-engine-hero.png" alt="" />
    <div className="engine-film-shade" />
    <div className="engine-grid" />
    <div className="engine-halo halo-one" /><div className="engine-halo halo-two" />
    <div className="orbit orbit-a"><i /><i /><i /></div><div className="orbit orbit-b"><i /><i /><i /></div><div className="orbit orbit-c"><i /><i /></div>
    <div className="engine-core"><span>01</span><Command size={36} /><b>MAYON</b></div>
    <div className="engine-tag tag-top">SIGNAL / ACTIVE</div><div className="engine-tag tag-bottom">SYSTEM / FORGE</div>
    <span className="particle particle-one" /><span className="particle particle-two" /><span className="particle particle-three" />
  </div>
}

function InterfaceArtwork({ type }: { type: string }) {
  return <div className={`experiment-art art-${type}`} aria-hidden="true"><div className="art-window"><div className="window-top"><i /><i /><i /><span /></div>
    {type === 'launch' && <div className="launch-screen"><small>THE FUTURE, IN FORM.</small><strong>BUILD<br /><em>LOUDER.</em></strong><b /></div>}
    {type === 'content' && <div className="content-screen"><div className="content-title">CONTENT<br />ENGINE <span>v.01</span></div><div className="content-stream"><i /><i /><i /><i /><i /></div></div>}
    {type === 'leads' && <div className="leads-screen"><aside><i /><i /><i /><i /></aside><main><span>DEMAND / FLOW</span><div className="lead-stat"><b>128</b><small>LIVE SIGNALS</small></div><div className="lead-chart" /></main></div>}
  </div><div className="art-reflection" /></div>
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [])
  return <div className="forge-page">
    <section className="forge-hero" id="top"><div className="forge-noise" />
      <nav className="forge-nav container"><Link to="/" className="forge-brand" aria-label="Mayon home"><Command size={18} /> MAYON<span>®</span></Link><div className={menuOpen ? 'forge-nav-links open' : 'forge-nav-links'}><a href="#systems" onClick={() => setMenuOpen(false)}>Systems</a><a href="#lab" onClick={() => setMenuOpen(false)}>The lab</a><a href="#process" onClick={() => setMenuOpen(false)}>Process</a></div><a href={contactLink} className="forge-nav-cta">Start a signal <ArrowUpRight size={15} /></a><button className="forge-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu" aria-expanded={menuOpen}><span /><span /></button></nav>
      <div className="container forge-hero-grid"><div className="forge-hero-copy"><div className="forge-kicker"><i /> INDEPENDENT CREATIVE SYSTEMS STUDIO <span>IND / 26</span></div><h1>Make the next<br /><em>signal</em> impossible<br />to ignore.</h1><p>Mayon builds visual identities, digital products and intelligent systems for founders who are here to make a mark.</p><div className="forge-actions"><a href="#lab" className="forge-button forge-button-primary">Enter the lab <ArrowDownRight size={17} /></a><a href={contactLink} className="forge-button forge-button-quiet">Launch a project</a></div></div><SignalEngine /></div>
      <div className="container forge-hero-footer"><span>SCROLL TO INITIATE</span><div><i /> <b>DESIGN</b><i /> <b>PRODUCT</b><i /> <b>INTELLIGENCE</b></div><MousePointer2 size={15} /></div>
    </section>
    <section className="forge-manifesto" id="systems"><div className="container manifesto-grid reveal"><div className="section-code">( 001 )<br />THE SIGNAL<br />IS THE<br />STRATEGY.</div><div><p className="manifesto-lede">Brands do not need more noise. They need a system with enough conviction to become <em>recognizable.</em></p><p className="manifesto-copy">Mayon is the space between sharp creative direction and serious technical execution. We make the surfaces people see—and the systems that keep them moving.</p></div></div></section>
    <section className="forge-systems"><div className="container"><div className="forge-section-head reveal"><span>CAPABILITY / FIELD</span><h2>Three disciplines.<br /><em>One connected</em> output.</h2><p>Every layer compounds. The brand makes the product legible; the product makes the system useful; the system makes growth repeatable.</p></div><div className="system-list">{systems.map((item) => { const Icon = item.icon; return <article className="system-row reveal" key={item.index}><span className="system-index">{item.index}</span><div className="system-icon"><Icon /></div><div><small>{item.label}</small><h3>{item.title}</h3></div><p>{item.copy}</p><ArrowUpRight className="system-arrow" /></article> })}</div></div></section>
    <section className="forge-lab" id="lab"><div className="lab-backdrop" /><div className="container"><div className="lab-title reveal"><span className="section-code">( 002 )</span><div><small>THE MAYON LAB</small><h2>Proof of<br /><em>possibility.</em></h2></div><p>Early-stage does not mean generic. These original system studies show the kind of thinking Mayon brings to a brief.</p></div><div className="experiments">{experiments.map((item, index) => <article className={`experiment experiment-${index + 1} reveal`} key={item.code}><div className="experiment-top"><span>{item.code}</span><span>{item.tag}</span></div><InterfaceArtwork type={item.type} /><div className="experiment-copy"><h3>{item.title}</h3><p>{item.detail}</p><span className="experiment-status"><CircleDot size={13} /> CONCEPT / IN DEVELOPMENT</span></div></article>)}</div></div></section>
    <section className="forge-process" id="process"><div className="container process-shell reveal"><div><span className="section-code">( 003 ) / THE BUILD</span><h2>Designed to<br />move from <em>idea</em><br />to impact.</h2></div><div className="process-steps"><article><span>01</span><div><b>Find the signal</b><p>We identify the sharpest truth in your offer, audience and ambition.</p></div></article><article><span>02</span><div><b>Give it form</b><p>We turn the idea into an identity, experience and system people can feel.</p></div></article><article><span>03</span><div><b>Put it in motion</b><p>We launch the work with the clarity and care it needs to keep growing.</p></div></article></div></div></section>
    <section className="forge-contact"><div className="container contact-shell"><div className="contact-orb"><Orbit /><span>LET'S<br />MAKE<br />A MARK</span></div><div><span className="section-code">( 004 ) / OPEN CHANNEL</span><h2>Have something<br />worth <em>building?</em></h2><p>Tell us where you want to go. We’ll work out the signal that gets you there.</p><a className="contact-email" href={contactLink}>mayodevs01@gmail.com <ArrowUpRight /></a><div className="contact-socials"><a href="https://www.instagram.com/mayodevs01" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.linkedin.com/in/mayon-thakur-b60903203/" target="_blank" rel="noreferrer">LinkedIn</a></div></div></div></section>
    <footer className="forge-footer container"><span>MAYON® / 2026</span><span>CREATIVE SYSTEMS FOR THE INTERNET</span><a href="#top">BACK TO TOP ↑</a></footer>
  </div>
}

export default Home
