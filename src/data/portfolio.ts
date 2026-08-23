import project01 from "@/assets/work/project-01.jpg";
import project02 from "@/assets/work/project-02.jpg";
import project03 from "@/assets/work/project-03.jpg";
import project04 from "@/assets/work/project-04.jpg";
import exp01 from "@/assets/work/exp-01.jpg";
import exp02 from "@/assets/work/exp-02.jpg";
import exp03 from "@/assets/work/exp-03.jpg";
import heroImg from "@/assets/work/hero.jpg";
import webHotelShowcase from "@/assets/work/web-hotel-showcase.png";
import experimentalFinanceDashboard from "@/assets/work/experimental-finance-dashboard.png";

/**
 * ─────────────────────────────────────────────
 *  MAYODEVS — single source of content.
 *  Brand copy, capabilities, process & contact
 *  all live here.
 * ─────────────────────────────────────────────
 */

export const contact = {
  name: "MayoDevs",
  email: "mayodevs01@gmail.com",
  gmailCompose:
    "https://mail.google.com/mail/?view=cm&fs=1&to=mayodevs01@gmail.com&su=Project%20Inquiry%20%E2%80%94%20MayoDevs",
};

/** Abstract dark visuals reused as atmospheric worlds — never as "projects". */
export const worlds = {
  idea: heroImg,
  visual: project01,
  web: webHotelShowcase,
  experimental: experimentalFinanceDashboard,
  portal: project03,
  light: exp01,
  glass: exp02,
  form: exp03,
};

/** The "one idea, many forms" sequence. */
export const forms = [
  "AN AD.",
  "A VISUAL.",
  "A WEBSITE.",
  "A BRAND WORLD.",
  "AN EXPERIENCE.",
  "SOMETHING WE HAVEN'T NAMED YET.",
];

/** Three broad creative worlds instead of a service list. */
export type CreativeWorld = {
  id: string;
  title: string;
  tagline: string;
  items: string[];
  image: string;
};

export const creativeWorlds: CreativeWorld[] = [
  {
    id: "01",
    title: "VISUAL",
    tagline: "Imagery that makes a brand feel like something.",
    items: [
      "AI advertisements",
      "Cinematic AI ad films",
      "Video & motion concepts",
      "Graphic design",
      "Brand visual systems",
      "Social creative",
    ],
    image: worlds.visual,
  },
  {
    id: "02",
    title: "WEB",
    tagline: "Places people land, explore and remember.",
    items: [
      "Business websites",
      "Landing pages",
      "Showcase sites",
      "Interactive digital experiences",
    ],
    image: worlds.web,
  },
  {
    id: "03",
    title: "EXPERIMENTAL",
    tagline: "The stuff that doesn't fit a category yet.",
    items: [
      "AI concepts",
      "Visual experiments",
      "New formats",
      "Ideas without a name",
    ],
    image: worlds.experimental,
  },
];

/** How an idea moves through the system. */
export const stages = [
  { id: "01", title: "IDEA", body: "It starts as a thought. Rough, unfinished, yours." },
  { id: "02", title: "DIRECTION", body: "We decide what it wants to become." },
  { id: "03", title: "EXPERIMENT", body: "Different forms, tools and directions get tried." },
  { id: "04", title: "BUILD", body: "The strongest version becomes something real." },
  { id: "05", title: "REFINE", body: "Everything that doesn't belong gets removed." },
  { id: "06", title: "RELEASE", body: "The finished thing goes out into the world." },
];
