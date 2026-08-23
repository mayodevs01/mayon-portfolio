import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { MouseEvent } from "react";

/** A living, authored visual for the homepage — no stock footage required. */
export function IdeaField() {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const tx = useSpring(x, { stiffness: 80, damping: 18 });
  const ty = useSpring(y, { stiffness: 80, damping: 18 });

  const move = (event: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) / 14);
    y.set((event.clientY - bounds.top - bounds.height / 2) / 14);
  };

  return (
    <div
      aria-label="An abstract moving composition representing an idea taking form"
      role="img"
      onMouseMove={move}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="relative aspect-[4/5] w-full max-w-[34rem] overflow-hidden border border-[#241914]/20 bg-[#e45d3d] shadow-[20px_24px_0_#201511] md:ml-auto"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_23%,#f2d691_0_2%,transparent_2.2%),radial-gradient(circle_at_22%_78%,#1c6257_0_11%,transparent_11.2%)]" />

      <motion.div style={{ x: tx, y: ty }} className="absolute inset-0">
        <motion.svg viewBox="0 0 700 820" className="h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id="mayo-gradient" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#f4e9ce" />
              <stop offset="1" stopColor="#f0a461" />
            </linearGradient>
            <filter id="soft-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="14" dy="16" stdDeviation="0" floodColor="#21130f" floodOpacity="0.26" />
            </filter>
          </defs>

          <motion.path
            d="M142 161C233 49 470 104 515 227c43 116-71 140-19 226 49 82 155 120 67 239-72 96-248 57-307-63-60-121-214-128-114-248z"
            fill="url(#mayo-gradient)"
            filter="url(#soft-shadow)"
            animate={reduce ? undefined : { d: [
              "M142 161C233 49 470 104 515 227c43 116-71 140-19 226 49 82 155 120 67 239-72 96-248 57-307-63-60-121-214-128-114-248z",
              "M130 205C210 43 471 85 541 214c59 108-87 157-41 232 44 71 136 112 58 238-77 124-241 75-320-35-66-92-174-102-108-239z",
              "M142 161C233 49 470 104 515 227c43 116-71 140-19 226 49 82 155 120 67 239-72 96-248 57-307-63-60-121-214-128-114-248z",
            ] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="352"
            cy="408"
            r="132"
            fill="none"
            stroke="#221512"
            strokeWidth="2"
            strokeDasharray="11 12"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "352px 408px" }}
          />
          <motion.path
            d="M195 453c66-119 212-194 334-133"
            fill="none"
            stroke="#221512"
            strokeWidth="7"
            strokeLinecap="round"
            animate={reduce ? undefined : { pathLength: [0.15, 1, 0.15] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx="529" cy="320" r="11" fill="#1c6257" />
          <circle cx="195" cy="453" r="11" fill="#1c6257" />
          <text x="351" y="421" textAnchor="middle" fill="#221512" fontFamily="DM Mono, monospace" fontSize="19" letterSpacing="4">
            IN MOTION
          </text>
        </motion.svg>
      </motion.div>

      <div className="absolute left-5 top-5 mono-label text-[#241914]">An idea, in public</div>
      <div className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#241914]/50 text-xl text-[#241914]">↗</div>
    </div>
  );
}
