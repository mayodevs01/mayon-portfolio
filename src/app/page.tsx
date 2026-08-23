"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import {
  ArrowUpRight,
  BrainCircuit,
  Command,
  Cpu,
  Layers3,
  Mail,
  Orbit,
  Play,
  Rocket,
  Sparkles,
  Wand2,
  X,
  Zap
} from "lucide-react";
import { type MouseEvent as ReactMouseEvent, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const rotatingWords = ["Design", "Content", "Automation", "AI", "SaaS"];
const creativeServices = [
  "Logo Design",
  "Brand Identity",
  "Social Media Design",
  "Thumbnail Design",
  "Video Editing",
  "Short Form Content Editing",
  "Content Writing",
  "Caption Writing",
  "Copywriting",
  "Ad Creatives"
];
const aiServices = [
  "Website Design",
  "Website Development",
  "SaaS MVPs",
  "AI Chatbots",
  "AI Agents",
  "Workflow Automation",
  "CRM Automation",
  "Lead Generation Systems",
  "Email Automation",
  "Marketing Automation",
  "Custom GPTs",
  "No-Code Apps"
];
const projects = [
  {
    category: "Creative Projects",
    title: "Launch Identity System",
    detail: "A premium brand kit, motion-ready social language, and conversion-focused ad creative stack for a founder-led product launch.",
    stats: ["38 assets", "4-week sprint", "3.4x CTR lift"]
  },
  {
    category: "Creative Projects",
    title: "Creator Content Engine",
    detail: "Short-form edit templates, thumbnail systems, hooks, captions, and a repeatable weekly publishing workflow.",
    stats: ["120 clips", "9 content pillars", "Daily output"]
  },
  {
    category: "AI Projects",
    title: "Autonomous Lead OS",
    detail: "A connected automation system for capture, scoring, enrichment, CRM routing, follow-up, and reporting.",
    stats: ["11 automations", "42% faster response", "CRM native"]
  },
  {
    category: "AI Projects",
    title: "Support Agent Stack",
    detail: "An AI chatbot and internal agent workspace trained on business knowledge, workflows, offers, and escalation logic.",
    stats: ["24/7 replies", "Custom GPT", "Human handoff"]
  }
];
const timeline = [
  ["01", "Design Systems", "Identity, visual language, layout craft, and premium brand presence."],
  ["02", "Content Engines", "Copy, captions, thumbnails, editing systems, and campaign assets."],
  ["03", "AI Products", "Chatbots, agents, MVP flows, and product-grade web experiences."],
  ["04", "Automation Ops", "CRM, lead gen, email, workflow, and marketing command systems."]
];
const launchMailto = `mailto:mayodevs01@gmail.com?subject=${encodeURIComponent("Project Inquiry - MayoDevs")}&body=${encodeURIComponent(
  "Hi Mayo,\n\nI'd like to discuss a project with you.\n\nProject Type:\nBudget:\nTimeline:\n\nLooking forward to hearing from you."
)}`;

function StarField() {
  const points = useRef<THREE.Points>(null);
  const particles = useMemo(() => {
    const positions = new Float32Array(1300 * 3);
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (Math.random() - 0.5) * 18;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useFrame(({ pointer, clock }) => {
    if (!points.current) return;
    points.current.rotation.y = pointer.x * 0.16 + clock.elapsedTime * 0.015;
    points.current.rotation.x = pointer.y * -0.08;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#8db8ff" size={0.025} transparent opacity={0.72} />
    </points>
  );
}

function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      gsap.to(dot.current, { x: event.clientX, y: event.clientY, duration: 0.08, ease: "power2.out" });
      gsap.to(ring.current, { x: event.clientX, y: event.clientY, duration: 0.32, ease: "power3.out" });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" />
      <div ref={dot} className="cursor-dot" />
    </>
  );
}

export default function Home() {
  const [word, setWord] = useState(0);
  const [activeProject, setActiveProject] = useState<(typeof projects)[number] | null>(null);
  const labRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, 150]);

  useEffect(() => {
    const timer = window.setInterval(() => setWord((current) => (current + 1) % rotatingWords.length), 1450);
    gsap.fromTo(".artifact", { y: 24, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, duration: 0.9, ease: "power3.out", delay: 0.4 });
    return () => window.clearInterval(timer);
  }, []);

  const handleLabPointer = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!labRef.current) return;
    const rect = labRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    labRef.current.style.setProperty("--mx", x.toFixed(3));
    labRef.current.style.setProperty("--my", y.toFixed(3));
  };

  return (
    <main>
      <Cursor />
      <motion.a
        className="launch-project"
        href={launchMailto}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <Rocket size={19} />
        <span>Launch Project</span>
      </motion.a>
      <nav className="topbar">
        <a href="#hero" className="brand"><Command size={18} /> MAYODEVS</a>
        <div>
          <a href="#studio">Studio</a>
          <a href="#lab">AI Lab</a>
          <a href="#projects">Systems</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="hero" className="hero">
        <div className="canvas-wrap">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <StarField />
          </Canvas>
        </div>
        <motion.div className="hero-content" style={{ y: heroY }}>
          <motion.div className="status-pill" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <Sparkles size={16} /> Creative Studio × AI Lab online
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            MAYODEVS
          </motion.h1>
          <div className="wordline">
            <span>Building premium systems for</span>
            <AnimatePresence mode="wait">
              <motion.b key={rotatingWords[word]} initial={{ opacity: 0, y: 22, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -22, filter: "blur(10px)" }}>
                {rotatingWords[word]}
              </motion.b>
            </AnimatePresence>
          </div>
          <p className="hero-copy">
            A futuristic studio for founders and brands that need design, content, AI automation, SaaS MVPs, and growth systems operating as one.
          </p>
          <div className="hero-actions">
            <a href="#studio" className="primary-btn"><Wand2 size={18} /> Creative Studio</a>
            <a href="#lab" className="ghost-btn"><BrainCircuit size={18} /> AI Lab</a>
          </div>
        </motion.div>
        <div className="orbital os-window">
          <span>Live Modules</span>
          <strong>Design / AI / SaaS / Growth</strong>
        </div>
      </section>

      <section id="studio" className="section studio-section">
        <div className="section-heading">
          <span><Layers3 size={16} /> Creative Studio</span>
          <h2>Brand artifacts that feel engineered, not decorated.</h2>
        </div>
        <div className="artifact-field">
          {creativeServices.map((service, index) => (
            <motion.div className="artifact" key={service} whileHover={{ y: -12, rotate: index % 2 ? 2 : -2, scale: 1.04 }}>
              <span>0{(index % 5) + 1}</span>
              <strong>{service}</strong>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="lab" className="section lab-section">
        <div className="section-heading">
          <span><Cpu size={16} /> AI Lab</span>
          <h2>Connected automations, AI products, and business operating systems.</h2>
        </div>
        <div className="network universe" ref={labRef} onMouseMove={handleLabPointer}>
          <div className="cosmic-noise" />
          <div className="nebula nebula-one" />
          <div className="nebula nebula-two" />
          <div className="streak streak-one" />
          <div className="streak streak-two" />
          <div className="orbit-path orbit-path-one" />
          <div className="orbit-path orbit-path-two" />
          <div className="orbit-path orbit-path-three" />
          <div className="network-core">
            <span className="core-glow" />
            <Orbit size={34} />
            <strong>MAYO OS</strong>
          </div>
          {aiServices.map((service, index) => (
            <motion.div
              className="orbit-lane"
              key={service}
              style={{
                "--i": index,
                "--angle": `${index * 30}deg`,
                "--orbit": `${index % 3}`,
                "--duration": `${28 + (index % 4) * 6}s`,
                "--delay": `${index * -2.4}s`
              } as React.CSSProperties}
            >
              <motion.div className="node">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{service}</strong>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="projects" className="section projects-section">
        <div className="section-heading">
          <span><Zap size={16} /> Systems I've Built</span>
          <h2>Case studies from creative campaigns to AI-powered business infrastructure.</h2>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <button className="project-tile" key={project.title} onClick={() => setActiveProject(project)}>
              <span>{project.category}</span>
              <strong>{project.title}</strong>
              <ArrowUpRight />
            </button>
          ))}
        </div>
      </section>

      <section className="section about-section">
        <div className="section-heading">
          <span><Play size={16} /> Timeline</span>
          <h2>Experience across the full creative-to-automation pipeline.</h2>
        </div>
        <div className="timeline">
          {timeline.map(([num, title, detail]) => (
            <motion.div className="timeline-item" key={title} whileHover={{ x: 12 }}>
              <b>{num}</b>
              <div>
                <strong>{title}</strong>
                <p>{detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="command-center">
          <div>
            <span className="terminal-label">/contact command-center</span>
            <h2>Initialize a premium system for your next launch.</h2>
          </div>
          <div className="terminal">
            <p><b>mayo@system</b> run discovery-call --scope creative+ai</p>
            <p><b>status</b> ready to design, automate, and ship</p>
            <p><b>Email:</b> <a className="terminal-email" href="mailto:mayodevs01@gmail.com">mayodevs01@gmail.com</a></p>
            <a href={launchMailto}><Mail size={18} /> Email Me Directly</a>
          </div>
        </div>
      </section>

      <button
        className="easter"
        onClick={() => document.body.classList.toggle("hyperdrive")}
        aria-label="Toggle hidden hyperdrive mode"
      >
        <Sparkles size={15} />
      </button>

      <AnimatePresence>
        {activeProject && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="case-modal" initial={{ y: 50, opacity: 0, scale: 0.96 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 50, opacity: 0, scale: 0.96 }}>
              <button className="modal-close" onClick={() => setActiveProject(null)} aria-label="Close case study"><X /></button>
              <span>{activeProject.category}</span>
              <h3>{activeProject.title}</h3>
              <p>{activeProject.detail}</p>
              <div className="modal-stats">
                {activeProject.stats.map((stat) => <b key={stat}>{stat}</b>)}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
