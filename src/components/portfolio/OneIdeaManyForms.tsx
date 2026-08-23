import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { forms, worlds } from "@/data/portfolio";

export function OneIdeaManyForms() {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const nextIndex = Math.min(forms.length - 1, Math.floor(value * forms.length));

    setIndex(nextIndex);
  });

  const imageOpacity = useTransform(scrollYProgress, [0, 0.12, 0.9, 1], [0, 0.72, 0.72, 0.18]);

  const imageY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.15]);

  return (
    <section ref={ref} className="relative h-[500vh]">
      <div
        className="
          sticky
          top-0
          flex
          h-[100svh]
          w-full
          flex-col
          items-center
          justify-center
          overflow-hidden
          px-5
          sm:px-6
        "
      >
        <motion.div
          style={{
            opacity: imageOpacity,
          }}
          className="absolute inset-0 overflow-hidden"
        >
          <motion.img
            src={worlds.light}
            alt=""
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              object-center
            "
            style={{
              y: imageY,
              scale: imageScale,
            }}
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-background/95
              via-background/45
              to-background/75
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-b
              from-background/60
              via-transparent
              to-background/85
            "
          />
        </motion.div>

        <div className="absolute inset-0 amber-wash opacity-30" />

        <div
          className="
            relative
            z-10
            flex
            w-full
            max-w-[92vw]
            flex-col
            items-center
            text-center
          "
        >
          <span
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
            "
          >
            A field note on possibility
          </span>

          <p
            className="
              text-display
              text-[clamp(1.5rem,3vw,2.25rem)]
              leading-none
              text-muted-foreground
            "
          >
            AN IDEA CAN BECOME
          </p>

          <div
            className="
              relative
              mt-4
              flex
              min-h-[13rem]
              w-full
              max-w-[92vw]
              items-center
              justify-center
              sm:min-h-[15rem]
              md:min-h-[18rem]
            "
          >
            {forms.map((form, formIndex) => (
              <motion.h2
                key={form}
                className="
                  absolute
                  left-1/2
                  top-1/2
                  w-full
                  max-w-[92vw]
                  -translate-x-1/2
                  -translate-y-1/2
                  px-2
                  text-display
                  text-[clamp(3.25rem,10vw,8rem)]
                  leading-[0.88]
                  tracking-[-0.03em]
                  text-foreground
                "
                initial={false}
                animate={{
                  opacity: index === formIndex ? 1 : 0,
                  y: index === formIndex ? 0 : 24,
                  filter: index === formIndex ? "blur(0px)" : "blur(6px)",
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className={formIndex === forms.length - 1 ? "text-editorial text-accent" : ""}>{form}</span>
              </motion.h2>
            ))}
          </div>

          <div className="mt-6 flex max-w-full gap-2 sm:mt-8 md:mt-10">
            {forms.map((_, formIndex) => (
              <span
                key={formIndex}
                className={`h-px w-5 transition-colors duration-300 sm:w-6 md:w-8 ${
                  index >= formIndex ? "bg-accent" : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
