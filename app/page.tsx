import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Technologies from "@/components/Technologies";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Interactions from "@/components/Interactions";

export default function Home() {
  return (
    <div
      id="site"
      className="relative"
      style={{
        // paleta "Ignition"
        ["--acc" as string]: "#FF5A36",
        ["--accrgb" as string]: "255,90,54",
        ["--line" as string]: "rgba(244,239,230,.10)",
        background: "#13110E",
        color: "#F4EFE6",
        overflowX: "clip",
      }}
    >
      <ScrollProgress />
      <Navbar />
      <main className="relative">
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Technologies />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Interactions />
    </div>
  );
}
