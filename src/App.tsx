import { Outlet, Route, Routes } from 'react-router-dom'
import { SiteLayout } from './components'
import Home from './Home'
import { CaseStudyPage, WorkPage } from './PortfolioPages'
import { AboutPage, IndustriesPage, ServicesPage } from './InfoPages'
import { ContactPage } from './ContactPage'
import { RealEstateDemo } from './RealEstateDemo'
import { EcommerceDemo } from './EcommerceDemo'
import { RestaurantDemo } from './RestaurantDemo'
import { LocalServiceDemo } from './LocalServiceDemo'
import { ProfessionalDemo } from './ProfessionalDemo'
import { SaasDemo } from './SaasDemo'

function PortfolioLayout() { return <SiteLayout><Outlet /></SiteLayout> }
function NotFoundPage() { return <section className="not-found"><div><span>404</span><h1>This page took a wrong turn.</h1><p>The link may be outdated, or the page may have moved.</p><a className="button button-primary" href="/">Back to Mayon</a></div></section> }

export default function App() {
  return <Routes>
    <Route element={<PortfolioLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/work" element={<WorkPage />} />
      <Route path="/work/:slug" element={<CaseStudyPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/industries" element={<IndustriesPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
    <Route path="/demos/real-estate" element={<RealEstateDemo />} />
    <Route path="/demos/ecommerce" element={<EcommerceDemo />} />
    <Route path="/demos/restaurant" element={<RestaurantDemo />} />
    <Route path="/demos/local-service" element={<LocalServiceDemo />} />
    <Route path="/demos/professional" element={<ProfessionalDemo />} />
    <Route path="/demos/saas" element={<SaasDemo />} />
  </Routes>
}
