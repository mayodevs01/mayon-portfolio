import {
  ArrowRight,
  Blocks,
  CheckCircle2,
  Gauge,
  MonitorSmartphone,
  SearchCheck,
  Sparkles,
  Wrench,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { ArrowLink, Eyebrow, FinalCta, SectionIntro } from './components'
import { processSteps, projects } from './data'

function BrowserMockup() {
  return (
    <div className="hero-art" aria-label="Preview of Mayon website and software work">
      <div className="glow" />
      <div className="mock-browser mock-browser-main">
        <div className="mock-bar"><i /><i /><i /><span /></div>
        <div className="estate-preview">
          <small>HAVEN & KEY</small>
          <h3>Find your perfect<br />place to call home</h3>
          <p>Thoughtfully selected homes in places worth living.</p>
          <span className="mock-action">Explore homes</span>
        </div>
        <div className="property-strip"><b /><b /><b /></div>
      </div>
      <div className="mock-browser mock-browser-left">
        <div className="mock-bar"><i /><i /><i /></div>
        <div className="restaurant-preview"><small>EMBER HOUSE</small><h3>Gather. Feast.<br />Remember.</h3><span /></div>
      </div>
      <div className="mock-browser mock-browser-right">
        <div className="mock-bar"><i /><i /><i /></div>
        <div className="saas-preview">
          <span className="side-nav" />
          <div><small>Overview</small><div className="metric-row"><b /><b /><b /></div><div className="chart-lines" /></div>
        </div>
      </div>
      <div className="mock-phone">
        <div className="phone-island" />
        <small>NORTHLINE</small>
        <h4>Timeless style.<br />Modern you.</h4>
        <div className="bag-art" />
        <span>Shop collection</span>
        <div className="phone-products"><b /><b /><b /></div>
      </div>
    </div>
  )
}

function Hero() {
  const trust = [
    [MonitorSmartphone, 'Responsive', 'on every device'],
    [Gauge, 'Fast &', 'performance-focused'],
    [SearchCheck, 'SEO-ready', 'foundations'],
    [Sparkles, 'Designed around', 'business goals'],
    [Wrench, 'Easy to update', 'and expand'],
  ] as const
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <Eyebrow>Independent Web & Software Studio</Eyebrow>
          <h1>Websites and software<br />built for <span>real businesses.</span></h1>
          <p>I design and develop professional websites, online stores, booking systems, dashboards and SaaS products that help businesses look better, attract customers and operate more efficiently.</p>
          <div className="button-row"><ArrowLink to="/work">Explore My Work</ArrowLink><ArrowLink to="/contact" variant="secondary">Start a Project</ArrowLink></div>
        </div>
        <BrowserMockup />
      </div>
      <div className="container trust-row">
        {trust.map(([Icon, title, sub]) => <div key={title}><Icon /><p><strong>{title}</strong><span>{sub}</span></p></div>)}
      </div>
    </section>
  )
}

function IndustrySection() {
  return (
    <section className="industries-home">
      <div className="container">
        <SectionIntro eyebrow="Industries" title="What are you looking to build?" text="Explore concept demos made for different business needs." />
        <div className="industry-grid">
          {projects.map(({ Icon, category, demo, image, color }) => (
            <Link className="industry-card" to={`/demos/${demo}`} key={demo} style={{ '--card-accent': color } as React.CSSProperties}>
              <div className="industry-label"><span><Icon size={18} /></span>{category}</div>
              <div className={`industry-image ${!image ? 'dashboard-image' : ''}`} style={image ? { backgroundImage: `url(${image})` } : undefined}>
                {!image && <><i /><i /><i /><b /></>}
                <span className="mini-button">View Demo <ArrowRight size={14} /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function DemoRow() {
  return (
    <section className="demo-row-section">
      <div className="container">
        <SectionIntro eyebrow="Live Demos" title="Six complete demo websites and apps." text="Each concept is interactive. Explore one and see the quality for yourself." />
        <div className="demo-row">
          {projects.map(project => (
            <Link className="demo-tile" to={`/demos/${project.demo}`} key={project.slug}>
              <div className={`demo-thumb ${!project.image ? 'dashboard-image' : ''}`} style={project.image ? { backgroundImage: `url(${project.image})` } : undefined} />
              <div><span>{project.name}</span><small>{project.kind}</small><b>Explore <ArrowRight size={13} /></b></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  return (
    <section className="projects-home">
      <div className="container">
        <div className="projects-heading">
          <SectionIntro eyebrow="Featured Work" title={<>Projects that solve<br />real business problems.</>} />
          <ArrowLink to="/work" variant="secondary">View All Projects</ArrowLink>
        </div>
        <div className="featured-grid">
          {projects.map(project => (
            <article className="featured-card" key={project.slug}>
              <div className={`featured-image ${!project.image ? 'dashboard-image' : ''}`} style={project.image ? { backgroundImage: `url(${project.image})` } : undefined}>
                <span>{project.number}</span>
                {!project.image && <><i /><i /><i /><b /></>}
              </div>
              <div className="featured-copy"><small>{project.category}</small><h3>{project.name}</h3><p>{project.description}</p>
                <div><ArrowLink to={`/demos/${project.demo}`} className="button-small">Live Demo</ArrowLink><ArrowLink to={`/work/${project.slug}`} variant="secondary" className="button-small">Case Study</ArrowLink></div>
              </div>
            </article>
          ))}
        </div>
        <div className="similar-strip"><div><strong>Want something similar for your business?</strong><span>Let’s discuss your project and build something that works for you.</span></div><ArrowLink to="/contact">Start a Similar Project</ArrowLink></div>
      </div>
    </section>
  )
}

function Process() {
  const icons = [SearchCheck, Blocks, Sparkles, Wrench, CheckCircle2, ArrowRight]
  return (
    <section className="process-section">
      <div className="container">
        <SectionIntro eyebrow="Process" title={<>My proven process<br />from idea to launch.</>} />
        <div className="process-track">
          {processSteps.map(([name, text], index) => {
            const Icon = icons[index]
            return <div className="process-step" key={name}><span><Icon size={18} /></span><h3>{name}</h3><p>{text}</p></div>
          })}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return <><Hero /><IndustrySection /><DemoRow /><ProjectsSection /><Process /><FinalCta /></>
}
