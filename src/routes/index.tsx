import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
const portrait = "/mayon-sculpt.png";

export const Route = createFileRoute("/")({ component: Portfolio });

const projects = [
  { id: "01", name: "StudyElo", kind: "PRODUCT / EDUCATION", description: "A study productivity platform built to help students stay organised, focused, and consistent. I took it from idea to a live product and keep improving the experience.", url: "https://studyelo.online/", cta: "EXPLORE LIVE SITE", mark: "SE", color: "violet" },
  { id: "02", name: "EchoLab", kind: "INTERACTIVE / 3D", description: "A browser-based educational prototype for exploring aircraft aerodynamics and UAV systems through interactive, simulated experiments.", url: "https://echolab-hackathon.pages.dev/", cta: "OPEN DEMO", mark: "EL", color: "cyan" },
  { id: "03", name: "LabFault 3D", kind: "HACKATHON / EDUCATION", description: "An interactive virtual lab built with Team FetchZero to let students explore experiments, find mistakes, and understand concepts by doing.", url: null, cta: null, mark: "LF", color: "lime" },
];

function FaceScene() {
  const host = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(false);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" }); }
    catch { setFallback(true); return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.z = 9.4;
    const group = new THREE.Group();
    scene.add(group);
    const geometry = new THREE.PlaneGeometry(4.05, 5.4, 64, 84);
    const pos = geometry.attributes.position;
    const gauss = (x: number, y: number, cx: number, cy: number, sx: number, sy: number) => Math.exp(-(((x-cx)/sx)**2 + ((y-cy)/sy)**2));
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i) / 2.025, y = pos.getY(i) / 2.7;
      const face = .38*gauss(x,y,0,-.02,.56,.55);
      const nose = .34*gauss(x,y,0,-.1,.16,.28);
      const cheeks = .11*(gauss(x,y,-.35,-.2,.2,.18)+gauss(x,y,.35,-.2,.2,.18));
      const hair = .18*gauss(x,y,0,.63,.75,.3);
      pos.setZ(i, face+nose+cheeks+hair);
    }
    geometry.computeVertexNormals();
    const texture = new THREE.TextureLoader().load(portrait);
    texture.colorSpace = THREE.SRGBColorSpace;
    const bust = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide, depthWrite: false }));
    bust.position.set(0, -.08, .7);
    group.add(bust);
    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x7effa9, transparent: true, opacity: .34 });
    const rings: THREE.Mesh[] = [];
    [[2.02,-.5,.27],[2.37,-1,-.31],[2.69,-1.5,.15]].forEach(([radius,z,tilt]) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(radius,.008,6,160), ringMaterial);
      ring.rotation.set(Math.PI/2.8,0,tilt);
      ring.position.z = z;
      group.add(ring); rings.push(ring);
    });
    const starsGeo = new THREE.BufferGeometry(), points = new Float32Array(220*3);
    for (let i=0;i<220;i++) { const a=i*2.399963,r=2.2+(i%19)*.095; points[i*3]=Math.cos(a)*r; points[i*3+1]=Math.sin(a)*r*.85; points[i*3+2]=-1.3-(i%7)*.09; }
    starsGeo.setAttribute("position",new THREE.BufferAttribute(points,3));
    group.add(new THREE.Points(starsGeo,new THREE.PointsMaterial({color:0x8af8bc,size:.018,transparent:true,opacity:.58})));
    const resize=()=>{ const {width,height}=el.getBoundingClientRect(); if(!width||!height)return; renderer.setSize(width,height); camera.aspect=width/height; camera.position.z=width<500?11.4:9.4; camera.updateProjectionMatrix(); };
    const observer=new ResizeObserver(resize); observer.observe(el); resize();
    let tx=0,ty=0,raf=0;
    const move=(e:PointerEvent)=>{if(reduced)return;const r=el.getBoundingClientRect();ty=((e.clientX-r.left)/r.width-.5)*.34;tx=((e.clientY-r.top)/r.height-.5)*-.19;};
    const reset=()=>{tx=0;ty=0;};
    el.addEventListener("pointermove",move);el.addEventListener("pointerleave",reset);
    const frame=()=>{group.rotation.x+=(tx-group.rotation.x)*.055;group.rotation.y+=(ty-group.rotation.y)*.055;renderer.render(scene,camera);raf=requestAnimationFrame(frame);};frame();
    return()=>{cancelAnimationFrame(raf);observer.disconnect();el.removeEventListener("pointermove",move);el.removeEventListener("pointerleave",reset);geometry.dispose();texture.dispose();rings.forEach(r=>r.geometry.dispose());ringMaterial.dispose();starsGeo.dispose();renderer.dispose();renderer.domElement.remove();};
  },[]);
  return <div className="face-scene" ref={host} role="img" aria-label="Stylized interactive 3D portrait of Mayon Thakur">{fallback&&<img src={portrait} alt="" />}</div>;
}

function Portfolio() {
  return <div className="devfolio" id="top">
    <a className="skip-link" href="#main">Skip to content</a><div className="scanlines" aria-hidden="true"/>
    <header className="site-nav"><a className="wordmark" href="#top" aria-label="Mayon Thakur, back to top"><span className="prompt-sign">&gt;</span> MAYON<span className="wordmark-dot">.DEV</span><span className="cursor"/></a><nav aria-label="Main navigation"><a href="#work">/work</a><a href="#about">/about</a><a href="#milestones">/milestones</a><a href="#contact">/contact</a></nav><a className="nav-social" href="https://github.com/mayodevs01" target="_blank" rel="noopener noreferrer">GITHUB ↗</a></header>
    <main id="main">
      <section className="hero-section" aria-labelledby="hero-title"><div className="hero-copy"><div className="eyebrow"><span className="live-dot"/> MAYODEVS / PERSONAL PORTFOLIO</div><div className="hero-code" aria-hidden="true"><span>01</span><i/><span>IDENTITY_LOADED</span></div><h1 id="hero-title">I BUILD<br/><em>WHAT IF.</em></h1><p className="hero-intro">I’m <strong>Mayon Thakur</strong> — a developer turning ideas into products, experiments, and interactive experiences. MayoDevs is where the builds live.</p><div className="hero-actions"><a className="primary-action" href="#work">EXPLORE THE WORK <span>↗</span></a><a className="text-action" href="#about">MEET THE BUILDER <span>↓</span></a></div><div className="hero-meta"><span>DESIGN × CODE × CURIOSITY</span><span>SCROLL TO DECODE ↓</span></div></div><div className="hero-visual"><div className="visual-grid" aria-hidden="true"/><div className="visual-glow" aria-hidden="true"/><div className="portrait-label top-label">FIG. 001 <span>HUMAN IN THE LOOP</span></div><FaceScene/><div className="portrait-label bottom-label">MAYON.EXE <span>REAL PERSON // REAL BUILDS</span></div><div className="visual-cross cross-one" aria-hidden="true">+</div><div className="visual-cross cross-two" aria-hidden="true">+</div></div></section>
      <div className="ticker" aria-hidden="true"><div>BUILD / BREAK / LEARN / REBUILD <span>✳</span> BUILD / BREAK / LEARN / REBUILD <span>✳</span> BUILD / BREAK / LEARN / REBUILD <span>✳</span></div></div>
      <section className="work-section section-wrap" id="work" aria-labelledby="work-title"><div className="section-heading"><span className="section-index">[ 01 / SELECTED WORK ]</span><h2 id="work-title">PROOF OF <em>WORK.</em></h2><p>Some things began as a question. Others as a hackathon prompt. All of them became something you can explore.</p></div><div className="project-grid">{projects.map(p=><article className={"project-card "+p.color} key={p.name}><div className="project-art" aria-hidden="true"><div className="art-ring art-ring-one"/><div className="art-ring art-ring-two"/><span>{p.mark}</span><small>PROJECT_{p.id} // LIVE FILE</small></div><div className="project-content"><div className="project-kicker"><span>{p.id} / {p.kind}</span><span>↗</span></div><h3>{p.name}</h3><p>{p.description}</p>{p.url?<a href={p.url} target="_blank" rel="noopener noreferrer">{p.cta} <span>↗</span></a>:<span className="project-unlinked">TEAM PROJECT · CASE STUDY COMING SOON</span>}</div></article>)}</div></section>
      <section className="about-section section-wrap" id="about" aria-labelledby="about-title"><div className="about-title"><span className="section-index">[ 02 / THE PERSON ]</span><h2 id="about-title">THE MIND<br/>BEHIND <em>THE CODE.</em></h2></div><div className="about-body"><span className="terminal-line">$ whoami</span><p>I’m Mayon. I like taking a rough idea and getting it into people’s hands. I work across web products, visual interfaces, and interactive learning experiences.</p><p>My approach is simple: learn the fundamentals, use modern tools to move faster, then understand and refine what I ship.</p><div className="about-chips"><span>WEB PRODUCTS</span><span>INTERACTIVE 3D</span><span>AI-ASSISTED BUILDING</span><span>DESIGN SYSTEMS</span></div></div></section>
      <section className="milestone-section section-wrap" id="milestones" aria-labelledby="milestones-title"><div className="section-heading"><span className="section-index">[ 03 / FIELD NOTES ]</span><h2 id="milestones-title">BUILT UNDER <em>PRESSURE.</em></h2></div><div className="milestone-grid"><div className="milestone"><span>01 / TEAM FETCHZERO</span><h3>Best Hackathon Project</h3><p>LabFault 3D was built during an institute-level hackathon and earned the team’s Best Hackathon Project award.</p></div><div className="milestone"><span>02 / TEAMWORK</span><h3>Ideathon win</h3><p>Another team win in the first semester, focused on shaping and presenting an idea for a real-world problem.</p></div><div className="milestone"><span>03 / THE PRACTICE</span><h3>Keep building</h3><p>Hackathons, shipped products, and experiments all feed the same habit: build, learn, improve, repeat.</p></div></div></section>
      <section className="contact-section section-wrap" id="contact" aria-labelledby="contact-title"><span className="section-index">[ 04 / OPEN CHANNEL ]</span><h2 id="contact-title">GOT A WILD<br/><em>IDEA?</em></h2><p>Let’s talk about building it.</p><a className="email-action" href="mailto:mayodevs01@gmail.com?subject=Let%27s%20build%20something">SEND A MESSAGE <span>↗</span></a><div className="contact-links"><a href="https://github.com/mayodevs01" target="_blank" rel="noopener noreferrer">GITHUB ↗</a><a href="https://www.linkedin.com/in/mayon-thakur/" target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a><a href="mailto:mayodevs01@gmail.com">EMAIL ↗</a></div></section>
    </main><footer className="site-footer"><span>© {new Date().getFullYear()} MAYON THAKUR / MAYODEVS</span><a href="#top">BACK TO TOP ↑</a><span>BUILT WITH CURIOSITY.</span></footer>
  </div>;
}
