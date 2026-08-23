import { Section, MaskedHeading, Reveal, SectionLabel } from "./primitives";

export function About() {
  return (
    <>
      {/* Why MayoDevs exists */}
      <Section className="py-32 md:py-48">
        <div className="mx-auto max-w-6xl">
          <SectionLabel className="mb-8">A small studio, still in motion</SectionLabel>
          <MaskedHeading
            lines={["THE MEDIUM CHANGES.", "THE CURIOSITY STAYS."]}
            accentIndex={1}
            className="text-[11vw] leading-[0.92] text-foreground md:text-7xl"
          />
          <div className="mt-16 grid gap-8 md:grid-cols-12">
            <div className="md:col-span-6 md:col-start-7">
              <Reveal>
                <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                  MayoDevs exists because good ideas rarely arrive knowing what
                  they want to be. One becomes an advertisement. Another becomes
                  a website. Another turns into a graphic, or something with no
                  category at all.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-8 text-lg leading-relaxed text-foreground md:text-xl">
                  MayoDevs is the identity that ties those experiments together —
                  a place where the format is flexible and the point is making
                  the idea real.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* About Mayon */}
      <Section id="about" className="py-32 md:py-48">
        <div className="mx-auto max-w-6xl">
          <MaskedHeading
            lines={["THE PERSON", "BEHIND THE WORK."]}
            className="text-[12vw] leading-[0.9] text-foreground md:text-8xl"
          />
          <div className="mt-16 grid gap-8 md:grid-cols-12">
            <div className="flex flex-col gap-6 md:col-span-6">
              <Reveal>
                <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                  I'm Mayon. I run MayoDevs. I'm 18, in my first year of college,
                  and I spend most of my free time turning ideas into things you
                  can actually see and use.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                  I freelance and experiment across AI, design, advertising,
                  websites and visual creation — building MayoDevs in real time,
                  one project at a time.
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-5 md:col-start-8">
              <Reveal delay={0.2}>
                <p className="text-lg leading-relaxed text-foreground md:text-2xl">
                  I don't have a decade of case studies. I do have taste, a fast
                  learning curve, and a real drive to make something worth
                  looking at.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
