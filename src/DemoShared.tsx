import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight, ChevronDown, X } from 'lucide-react'
import { Link } from 'react-router-dom'

export const demoLinks = [['real-estate','Haven & Key Realty'],['ecommerce','Northline Supply'],['restaurant','Ember House'],['local-service','Luma Studio'],['professional','Northstar Advisory'],['saas','LeadPilot']] as const
export function DemoToolbar({ current, projectType }: { current: string; projectType: string }) {
  const [open,setOpen]=useState(false)
  return <div className="demo-toolbar"><Link to="/" className="demo-mark">M</Link><span className="demo-current">Concept Demo · <b>{current}</b></span><button onClick={()=>setOpen(!open)} aria-expanded={open}>Change Demo <ChevronDown size={14}/></button><Link to="/work"><ArrowLeft size={14}/> Portfolio</Link><Link className="demo-start" to={`/contact?type=${encodeURIComponent(projectType)}&demo=${encodeURIComponent(current)}`}>Start a Similar Project <ArrowRight size={14}/></Link>{open&&<div className="demo-switcher">{demoLinks.map(([slug,name])=><Link key={slug} to={`/demos/${slug}`}>{name}<ArrowRight size={13}/></Link>)}</div>}</div>
}
export function Modal({ title,children,onClose,className='' }: { title:string;children:ReactNode;onClose:()=>void;className?:string }) {
  const closeRef=useRef<HTMLButtonElement>(null)
  const closeAction=useRef(onClose);closeAction.current=onClose
  useEffect(()=>{const previous=document.activeElement as HTMLElement|null;closeRef.current?.focus();const escape=(event:KeyboardEvent)=>event.key==='Escape'&&closeAction.current();document.addEventListener('keydown',escape);return()=>{document.removeEventListener('keydown',escape);previous?.focus()}},[])
  return <div className="modal-backdrop" role="presentation" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><section className={`demo-modal ${className}`} role="dialog" aria-modal="true" aria-labelledby="modal-title"><header><h2 id="modal-title">{title}</h2><button ref={closeRef} onClick={onClose} aria-label="Close dialog"><X/></button></header>{children}</section></div>
}
export function DemoNotice(){return <span className="concept-note">Interactive concept project by Mayon</span>}
