import { creativeWorlds } from "@/data/portfolio";
import { Section, SectionLabel, MaskedHeading, Reveal } from "./primitives";
import { MediaFrame } from "./MediaFrame";
import { cn } from "@/lib/utils";

export function CreativeWorlds() {
  return (
    <Section id="create" className="py-32 md:py-48">
      <div className="mx-auto max-w-[110rem]">
        <SectionLabel className="mb-8">Selected directions / not a service menu</SectionLabel>
        <MaskedHeading
          lines={["THREE WAYS TO", "MAKE A MARK."]}
          accentIndex={1}
          className="mb-24 max-w-5xl text-[14vw] leading-[0.84] text-foreground md:mb-32 md:text-8xl"
        />

        <div className="flex flex-col gap-24 md:gap-36">
          {creativeWorlds.map((w, i) => {
            const flipped = i % 2 === 1;
            return (
              <Reveal key={w.id}>
                <div className="grid gap-8 border-t paper-rule pt-5 md:grid-cols-12 md:items-start md:gap-12 md:pt-7">
                  <div
                    className={cn(
                      "relative md:col-span-8",
                      flipped ? "md:order-2 md:col-start-5" : "md:order-1",
                    )}
                  >
                    <span className="pointer-events-none absolute -top-8 left-1 z-10 text-editorial text-6xl text-accent md:-top-12 md:text-8xl">
                      {w.id}
                    </span>
                    <MediaFrame
                      image={w.image}
                      alt={w.title}
                      className="aspect-[16/10] w-full"
                    />
                  </div>

                  <div
                    className={cn(
                      "flex flex-col gap-6 md:col-span-4",
                      flipped ? "md:order-1 md:pt-24 md:pr-6" : "md:order-2 md:pt-24 md:pl-2",
                    )}
                  >
                    <span className="mono-label text-accent">Direction {w.id}</span>
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
                          className="mono-label text-foreground/70"
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
