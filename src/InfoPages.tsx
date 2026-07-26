import { Link } from 'react-router-dom'
import { ArrowRight, Blocks, Code2, Gauge, LayoutDashboard, MonitorSmartphone, ShoppingBag } from 'lucide-react'
import { Eyebrow, FinalCta, SectionIntro } from './components'
import { processSteps, projects } from './data'
import { PageHeading } from './PortfolioPages'

const services = [
  [MonitorSmartphone, 'Business Websites', 'Clear, responsive websites that communicate value quickly and make the next step obvious.'],
  [ShoppingBag, 'Ecommerce Stores', 'Considered shopping journeys, product discovery and cart experiences made for conversion.'],
  [Blocks, 'Booking Systems', 'Simple, structured appointment and reservation flows that reduce admin for your team.'],
  [LayoutDashboard, 'Dashboards & SaaS', 'Maintainable product interfaces that make complex work feel calm and manageable.'],
  [Gauge, 'Performance & SEO', 'Fast foundations, semantic structure and technical details that support discoverability.'],
  [Code2, 'Ongoing Development', 'Practical iteration and improvements as your business, content and customer needs evolve.'],
] as const

export function ServicesPage() {
  return <><PageHeading eyebrow="Services" title="Strategy, design and development under one roof." text="A focused service built for small businesses and teams who want useful, long-lasting digital work." />
    <section className="content-section"><div className="container service-grid">{services.map(([Icon, name, text], i) => <article key={name}><span>{String(i + 1).padStart(2, '0')}</span><Icon /><h2>{name}</h2><p>{text}</p></article>)}</div></section>
    <section className="service-process"><div className="container split-heading"><div><Eyebrow>How it works</Eyebrow><h2>A clear path from first conversation to launch.</h2></div><div>{processSteps.map(([name, text], index) => <div className="process-line" key={name}><span>{index + 1}</span><div><h3>{name}</h3><p>{text}</p></div></div>)}</div></div></section><FinalCta /></>
}

export function IndustriesPage() {
  return <><PageHeading eyebrow="Industries" title="Built around the way your business actually works." text="Explore six distinct concept experiences, each designed for the decisions, tasks and customers of its industry." />
    <section className="content-section"><div className="container industries-list">{projects.map(({ Icon, category, description, demo, color }, index) => <Link to={`/demos/${demo}`} key={demo} style={{ '--card-accent': color } as React.CSSProperties}><span>{String(index + 1).padStart(2, '0')}</span><div><Icon /><h2>{category}</h2><p>{description}</p></div><ArrowRight /></Link>)}</div></section><FinalCta /></>
}

export function AboutPage() {
  const values = [['Useful before flashy', 'Every visual choice should help someone understand, decide or act.'], ['Built to last', 'Clean structures and maintainable code make future changes less painful.'], ['Clear throughout', 'Straightforward communication keeps decisions visible and projects moving.']]
  return <><PageHeading eyebrow="About Mayon" title="Independent by design. Practical by default." text="Mayon is an independent web and software studio for businesses that care about thoughtful design and dependable execution." />
    <section className="about-story"><div className="container about-grid"><div className="about-visual"><span>M</span><i /><i /></div><div><Eyebrow>The studio</Eyebrow><h2>Good digital work starts with understanding the business.</h2><p>I work across design and development, which means ideas stay connected from the first wireframe through to the final interaction. The aim is simple: build the right thing, make it easy to use, and make sure it can grow.</p><p>Mayon works best with founders, local businesses and focused teams who value honest communication, strong craft and a calm process.</p><a href="mailto:mayodevs01@gmail.com">mayodevs01@gmail.com <ArrowRight size={16} /></a></div></div></section>
    <section className="values-section"><div className="container"><SectionIntro eyebrow="Principles" title="What guides the work." /><div className="values-grid">{values.map(([name,text],i)=><article key={name}><span>0{i+1}</span><h3>{name}</h3><p>{text}</p></article>)}</div></div></section><FinalCta /></>
}
