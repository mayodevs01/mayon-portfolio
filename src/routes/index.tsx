import { createFileRoute } from "@tanstack/react-router";
import { Loader } from "@/components/portfolio/Loader";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { OneIdeaManyForms } from "@/components/portfolio/OneIdeaManyForms";
import { CreativeWorlds } from "@/components/portfolio/CreativeWorlds";
import { Approach } from "@/components/portfolio/Approach";
import { Process } from "@/components/portfolio/Process";
import { About } from "@/components/portfolio/About";
import { Contact } from "@/components/portfolio/Contact";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Loader />
      <Nav />
      <main className="relative overflow-x-clip">
        <Hero />
        <OneIdeaManyForms />
        <CreativeWorlds />
        <Approach />
        <Process />
        <About />
        <Contact />
      </main>
    </>
  );
}
