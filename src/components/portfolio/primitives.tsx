import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* Section wrapper with generous cinematic spacing */
export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("relative w-full px-6 md:px-12 lg:px-20", className)}
    >
      {children}
    </section>
  );
}

/* Small tracked label with accent tick */
export function SectionLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.35em] text-muted-foreground",
        className,
      )}
    >
      <span className="h-px w-8 bg-accent" />
      {children}
    </span>
  );
}

/* Fade + rise reveal on scroll */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Masked line-by-line heading reveal */
const lineVariants: Variants = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: "0%",
    transition: { duration: 1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function MaskedHeading({
  lines,
  className,
  as: Tag = "h2",
  accentIndex,
}: {
  lines: string[];
  className?: string;
  as?: "h1" | "h2" | "h3";
  accentIndex?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  return (
    <Tag ref={ref} className={cn("text-display", className)}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.05em]">
          <motion.span
            className={cn(
              "block",
              accentIndex === i && "text-accent",
            )}
            custom={i}
            variants={lineVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* Magnetic button — pulls toward cursor on desktop */
export function MagneticButton({
  children,
  className,
  onClick,
  href,
  variant = "solid",
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "solid" | "outline" | "ghost";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const styles = cn(
    "group relative inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.25em] transition-colors duration-500",
    variant === "solid" &&
      "bg-accent text-accent-foreground hover:bg-accent/90",
    variant === "outline" &&
      "border border-border text-foreground hover:border-accent hover:text-accent",
    variant === "ghost" && "text-foreground hover:text-accent",
    className,
  );

  const inner = <span className="relative z-10 flex items-center gap-3">{children}</span>;

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="inline-block"
    >
      {href ? (
        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={styles} onClick={onClick}>
          {inner}
        </a>
      ) : (
        <button type="button" onClick={onClick} className={styles}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}
