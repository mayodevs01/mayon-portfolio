import { Route, Routes } from 'react-router-dom'
import { SiteLayout } from './components'
import Home from './Home'
import { CaseStudyPage, WorkPage } from './PortfolioPages'
import { AboutPage, IndustriesPage, ServicesPage } from './InfoPages'
import { ContactPage } from './ContactPage'

function NotFoundPage() {
  return <section className="not-found"><div><span>404</span><h1>This page took a wrong turn.</h1><p>The link may be outdated, or the page may have moved.</p><a className="button button-primary" href="/">Back to Mayon</a></div></section>
}

export default function App() {
  return <SiteLayout><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/work" element={<WorkPage />} />
    <Route path="/work/:slug" element={<CaseStudyPage />} />
    <Route path="/services" element={<ServicesPage />} />
    <Route path="/industries" element={<IndustriesPage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/404" element={<NotFoundPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes></SiteLayout>
}
