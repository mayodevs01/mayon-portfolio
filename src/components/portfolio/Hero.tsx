import { motion } from "framer-motion";
import { IdeaField } from "./IdeaField";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden bg-[#e7ddc5] text-[#201512]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(#20151222_1px,transparent_1px),linear-gradient(90deg,#20151222_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-[110rem] grid-rows-[1fr_auto] px-6 pb-8 pt-28 sm:px-8 md:px-12 lg:px-20">
        <div className="grid items-center gap-10 py-8 md:grid-cols-[1.05fr_.95fr] md:gap-16">
          <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="mb-9 flex items-center gap-4"
          >
            <span className="h-px w-10 bg-[#df5f40]" />
            <span className="mono-label">MayoDevs / a one-person creative practice</span>
          </motion.div>
          <h1
            className="text-display max-w-3xl text-[clamp(4.6rem,10vw,9.7rem)] leading-[0.81] text-[#201512]"
          >
            {["IDEAS NEED", "A BODY.", "LET'S BUILD ONE."] .map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={index === 1 ? "block text-editorial text-[#df5f40]" : "block"}
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
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.1 }}
            className="mt-9 max-w-sm text-base leading-relaxed text-[#49342a] md:mt-12 md:text-lg"
          >
            MayoDevs turns early sparks into visual worlds, websites and experiments people want to spend time with.
          </motion.p>
          <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} href="#create" className="mt-8 inline-flex w-fit items-center gap-3 border-b border-[#201512] pb-2 mono-label text-[#201512] transition-colors hover:border-[#df5f40] hover:text-[#df5f40]">See the studies <span className="text-xl leading-none">↓</span></motion.a>
        </div>
          <motion.div initial={{ opacity: 0, scale: 0.94, rotate: -4 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}>
            <IdeaField />
          </motion.div>
        </div>

        <div className="flex items-end justify-between gap-6 border-t border-[#201512]/30 pt-4">
          <span className="mono-label max-w-48">Visual / web / experimental</span>
          <span className="hidden text-editorial text-2xl sm:block">Still becoming.</span>
          <span className="mono-label text-[#df5f40]">Scroll ↓</span>
        </div>
      </div>
    </section>
  );
}
