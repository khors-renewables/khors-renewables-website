import Navbar from "@/components/Navbar";
import Hero from "@/components/pages/Hero";
import WhoWeAre from "@/components/pages/WhoWeAre";
import Rooftop from "@/components/pages/Rooftop";
import SolarTrusted from "@/components/pages/SolarTrusted";
import Subsidary from "@/components/pages/Subsidary";
import Contact from "@/components/pages/Contact";
import ScreenSize from "@/components/ScreenSize";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhoWeAre />
        <Rooftop />
        <SolarTrusted />
        <Subsidary />
        <Contact />
      </main>
      <ScreenSize />
    </>
  );
}
