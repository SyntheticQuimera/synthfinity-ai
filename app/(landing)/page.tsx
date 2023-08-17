import AnimatedBackground from "@/components/AnimatedBackground";
import LandingHero from "@/components/LandingHero";
import LandingNavbar from "@/components/LandingNavbar";

export default function LandingPage() {
  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
      <AnimatedBackground />
    </div>
  );
}
