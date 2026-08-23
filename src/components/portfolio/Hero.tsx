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
        flex
        min-h-[100svh]
        w-full
        items-center
        justify-center
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

        <div className="absolute inset-0 bg-background/60" />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-background/70
            via-transparent
            to-background
          "
        />

        <div className="absolute inset-0 amber-wash opacity-60" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-[96rem]
          flex-col
          items-center
          px-5
          pb-28
          pt-20
          text-center
          sm:px-6
          md:pb-32
          md:pt-24
          lg:px-8
        "
      >
        <motion.span
          initial={{
            opacity: 0,
            y: 16,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.4,
          }}
          className="
            mb-6
            text-[0.6rem]
            font-medium
            uppercase
            tracking-[0.32em]
            text-muted-foreground
            sm:mb-7
            sm:text-[0.65rem]
            sm:tracking-[0.4em]
            md:mb-8
            md:text-[0.7rem]
            md:tracking-[0.45em]
          "
        >
          AI <span className="text-accent">/</span> Design <span className="text-accent">/</span> Web{" "}
          <span className="text-accent">/</span> Ideas
        </motion.span>

        <motion.div style={{ x: headlineX }} className="w-full">
          <h1
            className="
              text-display
              mx-auto
              w-full
              max-w-[1500px]
              text-[clamp(3.7rem,11vw,9rem)]
              leading-[0.91]
              tracking-[-0.035em]
              text-foreground
            "
          >
            {["AN IDEA", "DOESN'T HAVE TO", "STAY AN IDEA."].map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={index === 2 ? "block text-accent" : "block"}
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
          transition={{
            duration: 1.2,
            delay: 1.1,
          }}
          className="
            mt-6
            max-w-xl
            px-3
            text-xs
            leading-relaxed
            text-muted-foreground
            sm:mt-7
            sm:text-sm
            md:mt-8
            md:text-base
          "
        >
          MayoDevs is a creative AI studio turning ideas into visuals, advertisements, graphics, websites and digital
          experiences.
        </motion.p>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="
          absolute
          bottom-5
          left-1/2
          z-10
          flex
          -translate-x-1/2
          flex-col
          items-center
          gap-2
          sm:bottom-6
          md:bottom-8
        "
      >
        <span
          className="
            text-[0.55rem]
            uppercase
            tracking-[0.3em]
            text-muted-foreground
            md:text-[0.6rem]
          "
        >
          Scroll
        </span>

        <div className="h-8 w-px overflow-hidden bg-border md:h-10">
          <motion.div
            className="h-4 w-full bg-accent"
            animate={{
              y: [-16, 40],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
