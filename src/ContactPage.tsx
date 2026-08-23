import { useMemo, useState, type FormEvent } from 'react'
import { ArrowRight, Mail, MessageCircle } from 'lucide-react'
import { PageHeading } from './PortfolioPages'

const businessTypes = ['Startup / founder-led brand', 'Creator / personal brand', 'Agency / service business', 'SaaS / software', 'Ecommerce', 'Local business', 'Other']
const projectTypes = ['Brand & content system', 'Launch website', 'Website redesign', 'SaaS MVP / product interface', 'AI chatbot or agent', 'Workflow / CRM automation', 'Growth system', 'Ongoing creative or development']

export function ContactPage() {
  const params = new URLSearchParams(window.location.search)
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const defaults = useMemo(() => ({ projectType: params.get('type') || '', referenceDemo: params.get('demo') || '' }), [])
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = event.currentTarget
    if (!form.checkValidity()) { setStatus('error'); form.reportValidity(); return }
    setStatus('loading'); const data = new FormData(form)
    const lines = Array.from(data.entries()).map(([key, value]) => `${key.replace(/([A-Z])/g, ' $1')}: ${value}`).join('\n')
    const subject = encodeURIComponent(`Project enquiry from ${data.get('fullName')}`)
    const body = encodeURIComponent(`Hi Mayon,\n\nI'd like to discuss a project.\n\n${lines}\n\nThanks!`)
    window.location.href = `mailto:mayodevs01@gmail.com?subject=${subject}&body=${body}`
    window.setTimeout(() => setStatus('success'), 500)
  }
  return <><PageHeading eyebrow="Open channel" title="Bring the idea. We’ll find the signal." text="You do not need a finished brief. A clear sense of the business, ambition and desired change is enough to start." />
    <section className="contact-section"><div className="container contact-grid"><aside><h2>Let’s make the first conversation useful.</h2><p>Tell us what is changing, what needs to move and where you want to be seen differently. We’ll reply with the most useful next step.</p><div><Mail /><a href="mailto:mayodevs01@gmail.com">mayodevs01@gmail.com</a></div><div><MessageCircle /><span>Instagram and LinkedIn linked from the site</span></div></aside>
      <form className="project-form" onSubmit={submit} noValidate>
        <div className="form-row"><label>Full name *<input name="fullName" required autoComplete="name" /></label><label>Email *<input name="email" type="email" required autoComplete="email" /></label></div>
        <div className="form-row"><label>Phone or WhatsApp<input name="phoneOrWhatsApp" autoComplete="tel" /></label><label>Business name<input name="businessName" autoComplete="organization" /></label></div>
        <label>Existing website<input name="existingWebsite" type="url" placeholder="https://" /></label>
        <div className="form-row"><label>Business type *<select name="businessType" required defaultValue=""><option value="" disabled>Select one</option>{businessTypes.map(x=><option key={x}>{x}</option>)}</select></label><label>Project type *<select name="projectType" required defaultValue={defaults.projectType}><option value="" disabled>Select one</option>{projectTypes.map(x=><option key={x}>{x}</option>)}</select></label></div>
        <label>What needs to move?<textarea name="featuresRequired" rows={3} placeholder="For example: launch a new offer, automate lead follow-up, build an AI assistant, make the brand feel more premium…" /></label>
        <div className="form-row"><label>Budget<select name="budget" defaultValue=""><option value="" disabled>Select a range</option><option>Under ₹75,000</option><option>₹75,000–₹1,50,000</option><option>₹1,50,000–₹3,00,000</option><option>₹3,00,000+</option><option>Not decided</option></select></label><label>Launch timeline<select name="launchTimeline" defaultValue=""><option value="" disabled>Select timing</option><option>Within 4 weeks</option><option>1–2 months</option><option>3–4 months</option><option>Flexible</option></select></label></div>
        <label>Project details *<textarea name="projectDetails" required rows={5} placeholder="What does the business do, what is not working today, and what would a successful result look like?" /></label>
        <label>Reference demo<input name="referenceDemo" defaultValue={defaults.referenceDemo} placeholder="A Mayon demo or another site you like" /></label>
        {status === 'error' && <p className="form-status error" role="alert">Please complete the required fields and check your email and website address.</p>}
        {status === 'success' && <p className="form-status success" role="status">Your email app should now be open with the enquiry prepared. If it did not open, email me directly.</p>}
        <button className="button button-primary form-submit" disabled={status === 'loading'}>{status === 'loading' ? 'Preparing Email…' : 'Prepare Project Email'} <ArrowRight size={16} /></button>
      </form></div></section></>
}
