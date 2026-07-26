import { Navigate, Route, Routes } from 'react-router-dom'
import { SiteLayout } from './components'
import Home from './Home'

function ComingSoon() {
  return <section className="page-hero container"><p className="eyebrow"><span />Mayon</p><h1>Thoughtful digital work<br />for ambitious businesses.</h1><p>This page is being shaped as part of the complete Mayon portfolio.</p></section>
}

export default function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<ComingSoon />} />
        <Route path="/services" element={<ComingSoon />} />
        <Route path="/industries" element={<ComingSoon />} />
        <Route path="/about" element={<ComingSoon />} />
        <Route path="/contact" element={<ComingSoon />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SiteLayout>
  )
}
