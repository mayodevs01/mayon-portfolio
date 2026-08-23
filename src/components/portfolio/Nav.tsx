import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { label: "CREATE", href: "#create" },
  { label: "APPROACH", href: "#approach" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 transition-all duration-500 md:px-12",
          scrolled && "bg-background/60 py-4 backdrop-blur-xl",
        )}
      >
        <a href="#top" className="text-display text-lg tracking-tight text-foreground">
          MAYODEVS<span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-[0.7rem] font-medium uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <button
          onClick={() => setOpen(true)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Open menu"
        >
          <span className="h-px w-7 bg-foreground" />
          <span className="h-px w-7 bg-foreground" />
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col justify-between bg-background px-8 py-8 md:hidden"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-between">
              <span className="text-display text-lg text-foreground">
                MAYODEVS<span className="text-accent">.</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                className="text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground"
              >
                Close ✕
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className="text-display text-5xl text-foreground"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <span className="text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
              AI / Design / Web / Ideas
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
