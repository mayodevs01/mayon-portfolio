import { contact } from "@/data/portfolio";
import { Section, MaskedHeading, MagneticButton, Reveal } from "./primitives";

export function Contact() {
  const year = new Date().getFullYear();
  return (
    <Section id="contact" className="relative py-40 md:py-56">
      <div className="absolute inset-0 amber-wash opacity-80" />
      <div className="relative mx-auto max-w-6xl">
        <MaskedHeading
          lines={["GOT A SPARK?", "START THERE."]}
          accentIndex={1}
          className="text-[12vw] leading-[0.9] text-foreground md:text-8xl"
        />
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground md:text-xl">
            You don't need the final form figured out. Bring the thought — a
            brand, a product, a business, a rough concept — and we'll work out
            what it should become.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-12">
            <MagneticButton href={contact.gmailCompose}>Bring the spark →</MagneticButton>
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <a
            href={contact.gmailCompose}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {contact.email}
          </a>
        </Reveal>
      </div>

      <footer className="relative mx-auto mt-40 flex max-w-6xl flex-col gap-4 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
        <span className="text-display text-2xl text-foreground">
          Mayo<span className="text-accent">Devs</span> <span className="text-accent">©</span> {year}
        </span>
        <span className="mono-label text-muted-foreground">
          Field Notes / Vol. 01
        </span>
      </footer>
    </Section>
  );
}
