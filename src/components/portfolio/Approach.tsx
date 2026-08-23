import { Section, MaskedHeading, Reveal } from "./primitives";

const statements = [
  { big: "THE TOOL CHANGES.", small: "The idea doesn't have to." },
  { big: "AI CAN GENERATE.", small: "Direction decides what stays." },
  { big: "MORE TOOLS.", small: "More possibilities. Not more noise." },
];

export function Approach() {
  return (
    <Section id="approach" className="relative py-32 md:py-48">
      <div className="absolute inset-0 amber-wash opacity-50" />
      <div className="relative mx-auto max-w-6xl">
        <MaskedHeading
          lines={["TASTE IS", "THE REAL TOOL."]}
          accentIndex={1}
          className="mb-20 text-[12vw] leading-[0.9] text-foreground md:text-8xl"
        />
        <div className="grid gap-px overflow-hidden border-y border-border md:grid-cols-3 md:gap-0 md:divide-x md:divide-border">
          {statements.map((s, i) => (
            <Reveal key={s.big} delay={i * 0.1}>
              <div className="flex h-full flex-col justify-between gap-8 py-10 md:px-8 md:py-14">
                <span className="text-[0.65rem] uppercase tracking-[0.3em] text-accent">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-display text-3xl leading-tight text-foreground md:text-4xl">
                    {s.big}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {s.small}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-16 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground md:text-xl">
            AI expanded what a small studio can make. But a good result still
            comes from a point of view — knowing what to keep, what to cut, and
            what the idea was actually trying to be.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
