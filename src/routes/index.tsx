import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import repos from "@/data/github-repos.json";
import contributions from "@/data/github-contributions.json";
import "./deck.css";

export const Route = createFileRoute("/")({ component: Portfolio });
const titles = [
  "Introduction",
  "My toolkit",
  "StudyElo",
  "LinkedIn",
  "GitHub",
  "Your idea",
];
function Portfolio() {
  const [card, setCard] = useState(0);
  const [direction, setDirection] = useState("forward");
  const [name, setName] = useState("");
  const [idea, setIdea] = useState("");
  function go(next: number) {
    setDirection(next > card ? "forward" : "back");
    setCard(next);
    document
      .querySelector(".deck-main")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function compose(event: FormEvent) {
    event.preventDefault();
    window.location.href =
      "mailto:mayodevs01@gmail.com?subject=" +
      encodeURIComponent("Project idea from " + name.trim()) +
      "&body=" +
      encodeURIComponent("Hi Mayon,\n\n" + idea.trim() + "\n\n" + name.trim());
  }
  return (
    <div className="deck-site">
      <header className="deck-header">
        <a href="/" className="deck-brand">
          MT <span>MAYON.LOL</span>
        </a>
        <a href="/Mayon-Thakur-Resume.pdf" download className="deck-outline">
          Download résumé ↗
        </a>
      </header>
      <main className="deck-main">
        <div className="deck-topline">
          <span>A FEW THINGS ABOUT ME</span>
          <span aria-live="polite">
            {String(card + 1).padStart(2, "0")} / 06 — {titles[card]}
          </span>
        </div>
        <div className="deck-stack">
          <article
            key={card}
            className={"deck-card " + direction}
            aria-label={titles[card]}
          >
            <div className="deck-eyebrow">
              CHAPTER {String(card + 1).padStart(2, "0")} <span>↗</span>
            </div>
            {card === 0 && (
              <div className="deck-intro">
                <div>
                  <h1>
                    Mayon
                    <br />
                    <em>Thakur.</em>
                  </h1>
                  <p className="deck-subtitle">
                    Developer. SaaS builder.
                    <br />
                    Founder of StudyElo.online.
                  </p>
                  <p>
                    First-year B.Tech student. Five hackathon wins. Looking for
                    real problems worth solving, and people to build with.
                  </p>
                  <button className="deck-link" onClick={() => go(1)}>
                    Get to know my work <ArrowRight size={19} />
                  </button>
                </div>
                <figure>
                  <img
                    className="deck-portrait"
                    src="/mayon-thakur.webp"
                    alt="Mayon Thakur"
                  />
                  <figcaption>THE PERSON BEHIND THE PROJECTS</figcaption>
                </figure>
              </div>
            )}
            {card === 1 && (
              <>
                <h2>
                  The tools
                  <br />
                  <em>behind the ideas.</em>
                </h2>
                <p>
                  I work across interfaces, application logic, and data to turn
                  an idea into a usable web product.
                </p>
                <div className="deck-skills">
                  {[
                    [
                      "01 / LANGUAGES",
                      "JavaScript",
                      "TypeScript",
                      "HTML",
                      "CSS",
                    ],
                    [
                      "02 / APPLICATIONS",
                      "React",
                      "Node.js",
                      "Cloudflare Workers",
                    ],
                    [
                      "03 / DATA & WORKFLOW",
                      "SQLite",
                      "Cloudflare D1 & KV",
                      "Git",
                      "PDF.js",
                    ],
                  ].map(([label, ...items]) => (
                    <section key={label}>
                      <h3>{label}</h3>
                      {items.map((item) => (
                        <span className="deck-tag" key={item}>
                          {item}
                        </span>
                      ))}
                    </section>
                  ))}
                </div>
                <p className="deck-note">
                  Learning through building, testing, and shipping.
                </p>
              </>
            )}
            {card === 2 && (
              <>
                <div className="deck-project-heading">
                  <div>
                    <h2>
                      StudyElo<em>.online</em>
                    </h2>
                    <p className="deck-subtitle">
                      A calmer way to get started.
                    </p>
                  </div>
                  <a className="deck-outline" href="https://studyelo.online/">
                    Explore the product <ArrowUpRight size={16} />
                  </a>
                </div>
                <img
                  className="deck-product"
                  src="/studyelo-focus.webp"
                  alt="StudyElo Pomodoro focus room"
                />
                <div className="deck-story">
                  <section>
                    <h3>THE PROBLEM</h3>
                    <p>
                      Getting organised can become a distraction from actually
                      studying.
                    </p>
                  </section>
                  <section>
                    <h3>WHAT I BUILT</h3>
                    <p>
                      A focus room, Pomodoro sessions, and study-time tracking
                      in one place.
                    </p>
                  </section>
                  <section>
                    <h3>MY ROLE</h3>
                    <p>
                      Founder and developer, from the first idea to deployment
                      and ongoing improvements.
                    </p>
                  </section>
                </div>
              </>
            )}
            {card === 3 && (
              <>
                <div className="deck-social-title">
                  <Linkedin />
                  <span>LINKEDIN / PROFILE</span>
                </div>
                <div className="deck-profile-banner" />
                <div className="deck-profile">
                  <img src="/mayon-thakur.webp" alt="Mayon Thakur" />
                  <div>
                    <h2>Mayon Thakur</h2>
                    <p className="deck-subtitle">
                      SaaS developer · Founder of StudyElo.online
                    </p>
                  </div>
                </div>
                <p>
                  First-year B.Tech Computer Science student at Dr. A.P.J. Abdul
                  Kalam Technical University. Building practical tools for
                  students and exploring projects that solve real-world
                  problems.
                </p>
                <div className="deck-profile-details">
                  <span>StudyElo · Founder</span>
                  <span>Greater Delhi Area</span>
                  <span>5 hackathon wins</span>
                </div>
                <a
                  className="deck-link"
                  href="https://www.linkedin.com/in/mayon-thakur/"
                >
                  View my LinkedIn profile <ArrowUpRight />
                </a>
                <p className="deck-note">
                  Profile summary · Visit LinkedIn for the full profile and
                  latest updates.
                </p>
              </>
            )}
            {card === 4 && (
              <>
                <div className="deck-social-title">
                  <Github />
                  <span>GITHUB / OPEN SOURCE</span>
                </div>
                <h2>@mayodevs01</h2>
                <p>Projects, experiments, and the work behind the interface.</p>
                <div className="deck-repos">
                  {repos.map((repo) => (
                    <a key={repo.name} href={repo.html_url}>
                      <strong>{repo.name} ↗</strong>
                      <p>
                        {repo.description ||
                          "Explore the repository and its source code."}
                      </p>
                      <span>{repo.language || "Repository"}</span>
                    </a>
                  ))}
                </div>
                <div className="deck-contribution-title">
                  <h3>CONTRIBUTION ACTIVITY</h3>
                  <a href="https://github.com/mayodevs01">
                    View live profile ↗
                  </a>
                </div>
                <div
                  className="deck-activity"
                  aria-label="GitHub contribution activity over the past year"
                >
                  {contributions.map((day) => (
                    <span
                      key={day.date}
                      data-level={day.level}
                      title={
                        day.date + " · Activity level " + day.level + " of 4"
                      }
                    />
                  ))}
                </div>
                <p className="deck-note">
                  Public GitHub snapshot · 9 November 2026 · Activity intensity
                  from low to high.
                </p>
              </>
            )}
            {card === 5 && (
              <>
                <div className="deck-social-title">
                  <Mail />
                  <span>A NOTE TO MAYON</span>
                </div>
                <h2>
                  What should
                  <br />
                  <em>we build next?</em>
                </h2>
                <p>
                  Tell me about the problem, who it affects, and what you have
                  in mind.
                </p>
                <form className="deck-mail" onSubmit={compose}>
                  <label>
                    Your name
                    <input
                      required
                      maxLength={100}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      placeholder="How should I call you?"
                    />
                  </label>
                  <label>
                    Your idea
                    <textarea
                      required
                      maxLength={4000}
                      rows={4}
                      value={idea}
                      onChange={(e) => setIdea(e.target.value)}
                      placeholder="I’m working on a problem…"
                    />
                  </label>
                  <button className="deck-outline" type="submit">
                    Open email draft <ArrowUpRight size={17} />
                  </button>
                  <p className="deck-note">
                    Opens your email app with the message ready to send to{" "}
                    <a href="mailto:mayodevs01@gmail.com">
                      mayodevs01@gmail.com
                    </a>
                    .
                  </p>
                </form>
              </>
            )}
          </article>
        </div>
        <nav className="deck-controls" aria-label="Card navigation">
          <button onClick={() => go(card - 1)} disabled={card === 0}>
            <ArrowLeft size={18} /> Previous
          </button>
          <div className="deck-dots">
            {titles.map((title, i) => (
              <button
                key={title}
                onClick={() => go(i)}
                aria-label={"Show " + title}
                aria-current={card === i ? "step" : undefined}
              />
            ))}
          </div>
          <button onClick={() => go(card === 5 ? 0 : card + 1)}>
            {card === 5 ? "Back to start" : "Next chapter"}{" "}
            <ArrowRight size={18} />
          </button>
        </nav>
      </main>
      <footer className="deck-footer">
        Mayon Thakur · Developer & founder <span>Made with curiosity.</span>
      </footer>
    </div>
  );
}
