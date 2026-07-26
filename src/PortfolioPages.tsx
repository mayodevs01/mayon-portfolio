import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'
import { ArrowLink, Eyebrow, FinalCta } from './components'
import { projects } from './data'

export function PageHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <section className="inner-hero"><div className="container"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{text}</p></div></section>
}

export function WorkPage() {
  return <><PageHeading eyebrow="Selected Work" title="Digital products shaped around real business needs." text="Six detailed concept projects showing how thoughtful strategy, design and development come together." />
    <section className="work-list"><div className="container work-grid">{projects.map(project => <article className="work-card" key={project.slug}>
      <Link to={`/work/${project.slug}`} className={`work-image ${!project.image ? 'dashboard-image' : ''}`} style={project.image ? { backgroundImage: `url(${project.image})` } : undefined}><span>{project.number}</span></Link>
      <div><small>Concept project · {project.category}</small><h2>{project.name}</h2><p>{project.description}</p><div className="button-row"><ArrowLink to={`/demos/${project.demo}`}>Explore Demo</ArrowLink><ArrowLink to={`/work/${project.slug}`} variant="secondary">Read Case Study</ArrowLink></div></div>
    </article>)}</div></section><FinalCta /></>
}

export function CaseStudyPage() {
  const { slug } = useParams(); const project = projects.find(item => item.slug === slug)
  if (!project) return <Navigate to="/404" replace />
  const challenges = ['Make key information easy to find on every device', 'Create a distinctive tone without getting in the user’s way', 'Turn the most important customer action into a short, clear flow']
  return <><section className="case-hero"><div className="container"><Link to="/work" className="back-link"><ArrowLeft size={15} /> All work</Link><small>Concept project · {project.category}</small><h1>{project.name}</h1><p>{project.description}</p><div className="button-row"><ArrowLink to={`/demos/${project.demo}`}>Explore Live Demo</ArrowLink><ArrowLink to={`/contact?type=${encodeURIComponent(project.kind)}&demo=${encodeURIComponent(project.name)}`} variant="secondary">Start Something Similar</ArrowLink></div></div></section>
    <section className="case-image-section"><div className={`container case-image ${!project.image ? 'dashboard-image' : ''}`} style={project.image ? { backgroundImage: `url(${project.image})` } : undefined}><div className="case-browser"><i/><i/><i/><span /></div></div></section>
    <section className="case-content"><div className="container case-copy"><aside><span>Project type</span><b>{project.kind}</b><span>Scope</span><b>Strategy, UX/UI, Development</b><span>Status</span><b>Interactive concept</b></aside><article><Eyebrow>The brief</Eyebrow><h2>Turn a complex customer journey into a confident next step.</h2><p>The concept begins with the questions a real customer would bring to the site. Content, navigation and interactions are then organised around those questions so the experience feels considered from the first screen.</p><h3>Core challenges</h3><ul>{challenges.map(item=><li key={item}><Check />{item}</li>)}</ul><h3>The approach</h3><p>A restrained visual system keeps attention on the offer. Reusable components create consistency, while responsive patterns ensure the same core journey works across desktop, tablet and mobile. The result is a working concept ready to explore—not a static mockup.</p></article></div></section>
    <section className="next-project"><div className="container"><span>Next: explore the product</span><h2>See {project.name} in action.</h2><ArrowLink to={`/demos/${project.demo}`}>Open Live Demo</ArrowLink></div></section></>
}
