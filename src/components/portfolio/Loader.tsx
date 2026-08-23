import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const SESSION_KEY = "mayo_field_notes_intro_seen";

const readout = [
  ["EDITION", "MAYO / 01"],
  ["PLACE", "UNFILED"],
  ["STARTING WITH", "AN IDEA"],
  ["STATUS", "OPENING"],
];

export function Loader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      alreadySeen = false;
    }

    if (alreadySeen) {
      setCount(100);
      setDone(true);
      return;
    }

    const duration = reduce ? 500 : 2400;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          /* ignore */
        }
        setTimeout(() => setDone(true), reduce ? 150 : 400);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  // Avoid hydration mismatch — render nothing until mounted decides.
  if (!mounted) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col justify-between bg-background px-6 py-8 md:px-12 md:py-12"
          exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: reduce ? 0.3 : 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="pointer-events-none absolute inset-0 amber-wash opacity-40" />

          <div className="relative flex items-start justify-between mono-label text-muted-foreground">
            <span>Independent creative practice</span>
            <span className="tabular-nums text-foreground">{String(count).padStart(2, "0")}</span>
          </div>

          <div className="relative flex flex-1 flex-col items-center justify-center gap-10 text-center">
            <motion.span
              className="text-display text-6xl text-foreground md:text-8xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Mayo<span className="text-accent">Devs</span><span className="text-accent">.</span>
            </motion.span>
            <span className="mono-label text-muted-foreground">
              Turning the page
            </span>
          </div>

          <div className="relative flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 mono-label text-muted-foreground sm:grid-cols-4">
              {readout.map(([k, v]) => (
                <span key={k} className="flex flex-col gap-0.5">
                  <span className="text-muted-foreground/60">{k}</span>
                  <span className="text-foreground/80">{v}</span>
                </span>
              ))}
            </div>
            <div className="h-px w-full overflow-hidden bg-border">
              <motion.div className="h-full bg-accent" style={{ width: `${count}%` }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
