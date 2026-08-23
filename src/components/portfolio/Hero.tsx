import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/work/hero.jpg";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, {
    stiffness: 60,
    damping: 20,
  });

  const sy = useSpring(my, {
    stiffness: 60,
    damping: 20,
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const heroImageX = useTransform(sx, (value) => value * -22);
  const heroImageY = useTransform(sy, (value) => value * -22);
  const headlineX = useTransform(sx, (value) => value * 12);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    mx.set((event.clientX - width / 2) / width);
    my.set((event.clientY - height / 2) / height);
  };

  return (
    <div
      id="top"
      ref={ref}
      onMouseMove={handleMove}
      className="
        relative
        min-h-[100svh]
        w-full
        items-center
        overflow-hidden
      "
    >
      <motion.div className="absolute -inset-y-[8%] inset-x-0" style={{ y: yBg }}>
        <motion.img
          src={heroImg}
          alt=""
          fetchPriority="high"
          className="h-full w-full scale-[1.06] object-cover"
          style={{
            x: heroImageX,
            y: heroImageY,
          }}
        />

        <div className="absolute inset-0 bg-background/45" />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-background/70
          via-background/10
            to-background
          "
        />

        <div className="absolute inset-0 amber-wash opacity-60" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-[110rem] grid-rows-[1fr_auto] px-6 pb-10 pt-28 sm:px-8 md:px-12 md:pb-12 lg:px-20"
      >
        <div className="flex flex-col justify-center pb-10 pt-12 md:pb-0 md:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="mb-9 flex items-center gap-4 text-muted-foreground"
          >
            <span className="h-px w-10 bg-accent" />
            <span className="mono-label">Mayo / Field Notes — Vol. 01</span>
          </motion.div>

          <motion.div style={{ x: headlineX }} className="w-full max-w-[110rem]">
          <h1
            className="
              text-display
              w-full
              max-w-[1200px]
              text-[clamp(4.2rem,10.8vw,10.4rem)]
              leading-[0.84]
              text-foreground
            "
          >
            {["AN IDEA", "DOESN'T HAVE TO", "STAY AN IDEA."].map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={index === 1 ? "block text-editorial text-accent" : "block"}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 1.1,
                    delay: 0.5 + index * 0.13,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.1 }}
            className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground md:ml-[33.333%] md:mt-10 md:text-base"
          >
            An independent creative practice for visuals, websites and the strange in-between. Built by Mayon, one idea at a time.
          </motion.p>
        </div>

        <div className="flex items-end justify-between gap-6 border-t paper-rule pt-4">
          <span className="mono-label max-w-48 text-muted-foreground">AI / design / web / ideas</span>
          <span className="hidden text-editorial text-2xl text-foreground/90 sm:block">Make it worth looking at.</span>
          <span className="mono-label text-accent">Scroll ↓</span>
        </div>
      </motion.div>
    </div>
  );
}
