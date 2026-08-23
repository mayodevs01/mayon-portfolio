import { Link } from 'react-router-dom'
import { ArrowRight, Bot, Code2, Orbit, PenTool, Sparkles, Workflow } from 'lucide-react'
import { Eyebrow, FinalCta, SectionIntro } from './components'
import { processSteps, projects } from './data'
import { PageHeading } from './PortfolioPages'

const services = [
  [PenTool, 'Brand & Content', 'Identity systems, campaign language, social design, thumbnails, editing and copy that make the message feel unmistakably yours.'],
  [Code2, 'Web & SaaS', 'Launch sites, product interfaces and MVPs designed to make an offer clear and a next step obvious.'],
  [Bot, 'AI Agents', 'Knowledge-aware chatbots and internal agents that answer, assist, route and escalate with useful context.'],
  [Workflow, 'Automation Ops', 'Lead capture, CRM routing, email flows and marketing systems designed to remove repetitive friction.'],
  [Orbit, 'Growth Systems', 'Connected creative and operational touchpoints that help a business turn attention into momentum.'],
  [Sparkles, 'Creative Direction', 'A focused point of view for founders who need the brand, experience and system to feel like one signal.'],
] as const

export function ServicesPage() {
  return <><PageHeading eyebrow="Capability field" title="Creative systems, built as one connected output." text="Mayon combines direction, design and technical execution so the story you tell and the system behind it move together." />
    <section className="content-section"><div className="container service-grid">{services.map(([Icon, name, text], i) => <article key={name}><span>{String(i + 1).padStart(2, '0')}</span><Icon /><h2>{name}</h2><p>{text}</p></article>)}</div></section>
    <section className="service-process"><div className="container split-heading"><div><Eyebrow>How it works</Eyebrow><h2>A clear path from first conversation to launch.</h2></div><div>{processSteps.map(([name, text], index) => <div className="process-line" key={name}><span>{index + 1}</span><div><h3>{name}</h3><p>{text}</p></div></div>)}</div></div></section><FinalCta /></>
}

export function IndustriesPage() {
  return <><PageHeading eyebrow="Experiment archive" title="Concept systems made to prove what is possible." text="These interactive studies explore different industries, journeys and product behaviours. They are prototypes, not client claims." />
    <section className="content-section"><div className="container industries-list">{projects.map(({ Icon, category, description, demo, color }, index) => <Link to={`/demos/${demo}`} key={demo} style={{ '--card-accent': color } as React.CSSProperties}><span>{String(index + 1).padStart(2, '0')}</span><div><Icon /><h2>{category}</h2><p>{description}</p></div><ArrowRight /></Link>)}</div></section><FinalCta /></>
}

export function AboutPage() {
  const values = [['A signal needs substance', 'Visual ambition has to be matched by a useful offer, clear system and work that stands up to scrutiny.'], ['Built to evolve', 'A living identity and maintainable product foundation make the next version easier, not harder.'], ['Honest about the stage', 'Early work is labelled as a concept. Real outcomes are only shared when they can be backed up.']]
  return <><PageHeading eyebrow="About Mayon" title="A new kind of studio for the next thing." text="Mayon is an independent creative systems studio for founders and teams who want their first impression to carry real intent." />
    <section className="about-story"><div className="container about-grid"><div className="about-visual"><span>M</span><i /><i /></div><div><Eyebrow>The studio</Eyebrow><h2>Design, product and intelligence should feel connected.</h2><p>Mayon works where brand thinking meets practical build craft: shaping the visual signal, the digital experience and the workflows behind it as one connected system.</p><p>The studio is built for ambitious founders and focused teams who would rather create a defining first move than blend into the feed.</p><a href="mailto:mayodevs01@gmail.com">mayodevs01@gmail.com <ArrowRight size={16} /></a></div></div></section>
    <section className="values-section"><div className="container"><SectionIntro eyebrow="Principles" title="What guides the work." /><div className="values-grid">{values.map(([name,text],i)=><article key={name}><span>0{i+1}</span><h3>{name}</h3><p>{text}</p></article>)}</div></div></section><FinalCta /></>
}
