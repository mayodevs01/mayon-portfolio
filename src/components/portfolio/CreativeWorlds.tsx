import { creativeWorlds } from "@/data/portfolio";
import { Section, SectionLabel, MaskedHeading, Reveal } from "./primitives";
import { cn } from "@/lib/utils";
import { WorldArtwork } from "./WorldArtwork";

const artworkKinds = ["visual", "web", "experimental"] as const;

export function CreativeWorlds() {
  return (
    <Section id="create" className="overflow-hidden bg-[#df5f40] py-32 md:py-48">
      <div className="mx-auto max-w-[110rem]">
        <SectionLabel className="mb-8 text-[#201512]">Three self-initiated directions</SectionLabel>
        <MaskedHeading
          lines={["NOT A REEL.", "A LITTLE WORLD."]}
          accentIndex={1}
          className="mb-24 max-w-5xl text-[14vw] leading-[0.84] text-[#201512] md:mb-32 md:text-8xl"
        />

        <div className="flex flex-col gap-24 md:gap-36">
          {creativeWorlds.map((w, i) => {
            const flipped = i % 2 === 1;
            return (
              <Reveal key={w.id}>
                <div className="grid gap-8 border-t border-[#201512]/30 pt-5 md:grid-cols-12 md:items-start md:gap-12 md:pt-7">
                  <div
                    className={cn(
                      "relative md:col-span-8",
                      flipped ? "md:order-2 md:col-start-5" : "md:order-1",
                    )}
                  >
                    <span className="pointer-events-none absolute -top-8 left-1 z-10 text-editorial text-6xl text-[#201512] md:-top-12 md:text-8xl">
                      {w.id}
                    </span>
                    <WorldArtwork kind={artworkKinds[i]} index={w.id} />
                  </div>

                  <div
                    className={cn(
                      "flex flex-col gap-6 md:col-span-4",
                      flipped ? "md:order-1 md:pt-24 md:pr-6" : "md:order-2 md:pt-24 md:pl-2",
                    )}
                  >
                    <span className="mono-label text-[#201512]/70">Direction {w.id}</span>
                    <h3 className="text-display text-6xl leading-none text-[#201512] md:text-7xl">
                      {w.title}
                    </h3>
                    <p className="max-w-sm text-lg leading-relaxed text-[#201512]/75">
                      {w.tagline}
                    </p>
                    <ul className="flex flex-wrap gap-x-6 gap-y-2">
                      {w.items.map((item) => (
                        <li
                          key={item}
                          className="mono-label text-[#201512]/75"
                        >
                          <span className="mr-2 text-[#201512]">/</span>
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
