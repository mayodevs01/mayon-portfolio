import { creativeWorlds } from "@/data/portfolio";
import { Section, SectionLabel, MaskedHeading, Reveal } from "./primitives";
import { MediaFrame } from "./MediaFrame";
import { cn } from "@/lib/utils";

export function CreativeWorlds() {
  return (
    <Section id="create" className="py-28 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionLabel className="mb-8">What MayoDevs makes</SectionLabel>
        <MaskedHeading
          lines={["THREE WORLDS.", "ONE STUDIO."]}
          accentIndex={1}
          className="mb-20 text-[12vw] leading-[0.9] text-foreground md:text-8xl"
        />

        <div className="flex flex-col gap-24 md:gap-36">
          {creativeWorlds.map((w, i) => {
            const flipped = i % 2 === 1;
            return (
              <Reveal key={w.id}>
                <div className="grid gap-8 md:grid-cols-12 md:items-center">
                  <div
                    className={cn(
                      "relative md:col-span-7",
                      flipped ? "md:order-2 md:col-start-6" : "md:order-1",
                    )}
                  >
                    <span className="pointer-events-none absolute -top-10 left-0 z-10 text-display text-6xl text-foreground/10 md:-top-16 md:text-8xl">
                      {w.id}
                    </span>
                    <MediaFrame
                      image={w.image}
                      alt={w.title}
                      className="aspect-[16/11] w-full"
                    />
                  </div>

                  <div
                    className={cn(
                      "flex flex-col gap-6 md:col-span-5",
                      flipped ? "md:order-1 md:pr-8" : "md:order-2 md:pl-8",
                    )}
                  >
                    <h3 className="text-display text-6xl leading-none text-foreground md:text-7xl">
                      {w.title}
                    </h3>
                    <p className="max-w-sm text-lg leading-relaxed text-muted-foreground">
                      {w.tagline}
                    </p>
                    <ul className="flex flex-wrap gap-x-6 gap-y-2">
                      {w.items.map((item) => (
                        <li
                          key={item}
                          className="text-sm uppercase tracking-[0.15em] text-foreground/70"
                        >
                          <span className="mr-2 text-accent">/</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
