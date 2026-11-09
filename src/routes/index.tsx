import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, ArrowUpRight, Download } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import "./archive.css";

export const Route = createFileRoute("/")({ component: Portfolio });

const chapters = [
  { id: "intro", number: "01", title: "Introduction" },
  { id: "projects", number: "02", title: "Featured work", nav: "Work" },
  { id: "about", number: "03", title: "About", nav: "About" },
  { id: "contact", number: "04", title: "Contact", nav: "Contact" },
] as const;

type Chapter = (typeof chapters)[number];
type ChapterId = Chapter["id"];

const resume = "/Mayon-Thakur-Resume.pdf";
const studyElo = "https://studyelo.online/";
const email = "mayodevs01@gmail.com";

function Portfolio() {
  const [current, setCurrent] = useState<ChapterId>("intro");

  useEffect(() => {
    const sections = chapters
      .flatMap(({ id }) => {
        const section = document.getElementById(id);
        return section ? [{ id, section }] : [];
      })
      .reverse();
    let frame = 0;

    function updateChapter() {
      frame = 0;
      const readingLine = Math.min(window.innerHeight * 0.37, 260);
      const section = sections.find(
        ({ section }) => section.getBoundingClientRect().top <= readingLine,
      );
      const atBottom =
        window.scrollY > 0 &&
        window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 2;
      setCurrent(atBottom ? "contact" : (section?.id ?? "intro"));
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(updateChapter);
    }

    updateChapter();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="archive">
      <a className="archive-skip" href="#portfolio-main">
        Skip to content
      </a>
      <header className="archive-header">
        <div className="archive-header-inner archive-wrap">
          <a
            className="archive-brand"
            href="#intro"
            aria-label="mayon.lol home"
          >
            <span className="archive-monogram" aria-hidden="true">
              MT
            </span>
            <span>mayon.lol</span>
          </a>
          <nav className="archive-nav" aria-label="Portfolio chapters">
            {chapters.map(
              (chapter) =>
                "nav" in chapter && (
                  <a
                    key={chapter.id}
                    href={`#${chapter.id}`}
                    aria-current={
                      current === chapter.id ? "location" : undefined
                    }
                  >
                    {chapter.nav}
                  </a>
                ),
            )}
          </nav>
          <ResumeLink />
        </div>
      </header>

      <main
        id="portfolio-main"
        className="archive-wrap archive-timeline"
        tabIndex={-1}
      >
        <ChapterSection
          chapter={chapters[0]}
          current={current}
          className="archive-intro"
        >
          <div className="archive-hero-grid">
            <div>
              <h1>
                Mayon
                <br />
                Thakur
              </h1>
              <p className="archive-role">
                SaaS developer &amp; founder of{" "}
                <a href={studyElo}>StudyElo.online</a>
              </p>
              <p className="archive-lead">
                I’m a first-year B.Tech student building software around real
                problems, starting with how students study.
              </p>
              <a className="archive-link" href="#projects">
                Explore StudyElo <ArrowDown aria-hidden="true" />
              </a>
            </div>
            <figure className="archive-portrait">
              <div className="archive-photo-frame">
                <img
                  src="/mayon-thakur.webp"
                  width="760"
                  height="1352"
                  alt="Mayon Thakur wearing black glasses"
                  fetchPriority="high"
                />
              </div>
              <figcaption>
                <span>Fig. 01</span>
                <span>Mayon Thakur</span>
              </figcaption>
            </figure>
          </div>
        </ChapterSection>

        <ChapterSection
          chapter={chapters[1]}
          current={current}
          className="archive-work"
        >
          <div className="archive-work-heading">
            <div>
              <h2>StudyElo</h2>
              <p className="archive-deck">
                From starting a session to building a routine.
              </p>
            </div>
            <span className="archive-project-role">Founder / Developer</span>
          </div>
          <div className="archive-project-grid">
            <div className="archive-project-story">
              <div>
                <h3>The problem</h3>
                <p>
                  It’s easy to spend more time setting up a study session than
                  getting started.
                </p>
              </div>
              <div>
                <h3>The build</h3>
                <p>
                  I put a Pomodoro timer, a focus room, and study-time tracking
                  in one place.
                </p>
              </div>
              <div>
                <h3>The lesson</h3>
                <p>
                  The first few seconds matter. Make it easy to start, then give
                  students a reason to come back.
                </p>
              </div>
            </div>
            <div>
              <figure className="archive-product">
                <img
                  src="/studyelo-focus.webp"
                  width="1280"
                  height="586"
                  alt="StudyElo’s Pomodoro focus room with a 90-minute timer and a nighttime desk backdrop"
                  decoding="async"
                />
                <figcaption>
                  <span>Fig. 02 / Pomodoro focus room</span>
                  <span>studyelo.online</span>
                </figcaption>
              </figure>
              <div className="archive-actions">
                <a className="archive-link" href="#case-study">
                  Read the case study <ArrowDown aria-hidden="true" />
                </a>
                <a className="archive-link" href={studyElo}>
                  Visit StudyElo <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div id="case-study" className="archive-case" tabIndex={-1}>
            <p className="archive-label">Inside the build</p>
            <h3>What happens after you press Start?</h3>
            <div className="archive-case-grid">
              <p>
                StudyElo gives a session a beginning and an end. The focus room
                puts the timer up front, and Pomodoro breaks give students a
                natural point to pause before the next round. Study-time
                tracking makes the work visible across sessions.
              </p>
              <p>
                I took StudyElo from idea to deployment, working on the
                responsive interface, study tools, and content. Once it was
                live, I kept refining how the pieces fit together around the
                same question: how quickly can someone get back to studying?
              </p>
            </div>
          </div>
        </ChapterSection>

        <ChapterSection
          chapter={chapters[2]}
          current={current}
          className="archive-about"
        >
          <h2>About me</h2>
          <div className="archive-about-grid">
            <div className="archive-about-copy">
              <p>
                I’m a first-year B.Tech Computer Science student at Dr. A.P.J.
                Abdul Kalam Technical University, a SaaS developer, and the
                founder of StudyElo.online.
              </p>
              <p>
                I’ve won five hackathons. I’m looking to work with people who
                can point to a real problem and want to build something that
                makes it easier to solve.
              </p>
            </div>
            <dl className="archive-facts">
              <div>
                <dt>Education</dt>
                <dd>B.Tech Computer Science · First year</dd>
              </div>
              <div>
                <dt>Hackathons</dt>
                <dd>5 wins</dd>
              </div>
              <div>
                <dt>Tools</dt>
                <dd>TypeScript, React, Node.js, SQLite, Git</dd>
              </div>
            </dl>
          </div>
        </ChapterSection>

        <ChapterSection
          chapter={chapters[3]}
          current={current}
          className="archive-contact"
        >
          <h2>Let’s build something useful.</h2>
          <p className="archive-lead">
            Have a problem you’re working on? Tell me who it affects and what
            you’ve tried so far.
          </p>
          <a className="archive-link archive-email" href={`mailto:${email}`}>
            {email} <ArrowUpRight aria-hidden="true" />
          </a>
          <div className="archive-actions">
            <a className="archive-link" href="https://github.com/mayodevs01">
              GitHub <ArrowUpRight aria-hidden="true" />
            </a>
            <a
              className="archive-link"
              href="https://www.linkedin.com/in/mayon-thakur/"
            >
              LinkedIn <ArrowUpRight aria-hidden="true" />
            </a>
            <ResumeLink />
          </div>
        </ChapterSection>
      </main>

      <footer className="archive-footer archive-wrap">
        <span>© {new Date().getFullYear()} Mayon Thakur</span>
        <a className="archive-link" href="#intro">
          Back to top <ArrowUp aria-hidden="true" />
        </a>
      </footer>
    </div>
  );
}

function ResumeLink() {
  return (
    <a className="archive-resume" href={resume} download>
      Download résumé <Download size={15} aria-hidden="true" />
    </a>
  );
}

function ChapterSection({
  chapter,
  current,
  className,
  children,
}: {
  chapter: Chapter;
  current: ChapterId;
  className: string;
  children: ReactNode;
}) {
  return (
    <section
      id={chapter.id}
      className={`archive-chapter ${className}`}
      tabIndex={-1}
      data-current={current === chapter.id}
      aria-labelledby={`chapter-${chapter.id}`}
    >
      <div className="archive-chapter-label">
        <span className="archive-chapter-number">{chapter.number}</span>
        <span id={`chapter-${chapter.id}`} className="archive-label">
          / {chapter.title}
        </span>
      </div>
      <div className="archive-reveal">{children}</div>
    </section>
  );
}
