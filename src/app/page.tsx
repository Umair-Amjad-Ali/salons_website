import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Team from "@/components/sections/Team";
import Gallery from "@/components/sections/Gallery";
import FAQ from "@/components/sections/FAQ";
import Location from "@/components/sections/Location";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Services />
      <Team />
      <Gallery />
      <Location />
      <FAQ />
    </div>
  );
}
