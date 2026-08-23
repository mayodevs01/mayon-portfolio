import { Section, MaskedHeading, Reveal } from "./primitives";

const statements = [
  { big: "THE BRIEF CAN BE MESSY.", small: "The direction cannot." },
  { big: "THE TOOL CHANGES.", small: "The eye stays." },
  { big: "MAKE LESS. MEAN MORE.", small: "Cut until it feels inevitable." },
];

export function Approach() {
  return (
    <Section id="approach" className="relative py-32 md:py-48">
      <div className="absolute inset-0 amber-wash opacity-50" />
      <div className="relative mx-auto max-w-[110rem]">
        <MaskedHeading
          lines={["TASTE IS A", "FORM OF DIRECTION."]}
          accentIndex={1}
          className="mb-20 max-w-5xl text-[13vw] leading-[0.84] text-foreground md:text-8xl"
        />
        <div className="grid gap-px overflow-hidden border-y border-border md:grid-cols-3 md:gap-0 md:divide-x md:divide-border">
          {statements.map((s, i) => (
            <Reveal key={s.big} delay={i * 0.1}>
              <div className="flex h-full flex-col justify-between gap-8 py-10 md:px-8 md:py-14">
                <span className="mono-label text-accent">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-display text-4xl leading-[0.92] text-foreground md:text-5xl">
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
            AI can expand what a small studio can make. The point is still a
            point of view — knowing what to keep, what to cut, and what the
            idea was actually trying to become.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
