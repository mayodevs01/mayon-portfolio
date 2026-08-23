import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { stages } from "@/data/portfolio";
import { MaskedHeading } from "./primitives";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["2%", "-78%"],
  );

  const line = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"],
  );

  return (
    <section
      ref={ref}
      className="relative h-[360vh]"
    >
      <div
        className="
          sticky
          top-0
          flex
          h-[100svh]
          flex-col
          justify-center
          overflow-hidden
        "
      >
        <div className="px-6 md:px-12 lg:px-20">
          <MaskedHeading
            lines={["HOW AN IDEA", "MOVES."]}
            accentIndex={1}
            className="
              mb-5
              text-[clamp(3rem,10vw,7rem)]
              leading-[0.9]
              text-foreground
              md:mb-6
            "
          />

          <div
            className="
              mb-8
              h-px
              w-full
              max-w-2xl
              overflow-hidden
              bg-border
              md:mb-10
              lg:mb-12
            "
          >
            <motion.div
              className="h-full bg-accent"
              style={{ width: line }}
            />
          </div>
        </div>

        <motion.div
          style={{ x }}
          className="
            flex
            items-stretch
            gap-6
            pl-6
            md:gap-10
            md:pl-20
          "
        >
          {stages.map((step) => (
            <div
              key={step.id}
              className="
                relative
                flex
                h-[clamp(22rem,48svh,32rem)]
                min-h-[22rem]
                w-[82vw]
                shrink-0
                flex-col
                overflow-hidden
                rounded-lg
                border
                border-border
                bg-card/40
                p-6
                backdrop-blur-sm
                sm:w-[72vw]
                sm:p-7
                md:w-[36vw]
                md:min-w-[28rem]
                md:p-8
                lg:w-[34vw]
                lg:p-10
              "
            >
              <span
                className="
                  text-display
                  text-[clamp(5rem,9vw,8rem)]
                  leading-[0.8]
                  text-foreground/10
                "
              >
                {step.id}
              </span>

              <div className="mt-auto">
                <h3
                  className="
                    text-display
                    text-[clamp(2.7rem,5vw,4.5rem)]
                    leading-[0.9]
                    text-accent
                  "
                >
                  {step.title}
                </h3>

                <p
                  className="
                    mt-4
                    max-w-sm
                    text-sm
                    leading-relaxed
                    text-muted-foreground
                    sm:text-base
                    md:text-lg
                  "
                >
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
