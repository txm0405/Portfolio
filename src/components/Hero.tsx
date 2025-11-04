import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "/hero-bg.webp";

const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16" aria-labelledby="hero-heading">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
        role="img"
        aria-label="Hintergrundbild mit abstraktem technologischen Design"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in">
        <div className="inline-block mb-4 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm" role="status" aria-label="Portfolio Badge">
          <span className="text-primary text-sm font-medium">Portfolio</span>
        </div>
        
        <h1 id="hero-heading" className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6">
          Tom Hoffmann
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto px-4">
          Tech Tinkerer & Creative Developer
        </p>
        
        <p className="text-base sm:text-lg text-muted-foreground mb-8 md:mb-12 max-w-xl mx-auto px-4">
          Ich entwickle digitale Projekte, die meistens funktionieren und Spaß machen.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow"
            onClick={scrollToProjects}
          >
            Projekte ansehen
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-primary/30 hover:bg-primary/10"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Kontakt aufnehmen
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={scrollToProjects}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer bg-transparent border-none"
        aria-label="Nach unten scrollen zu den Projekten"
        type="button"
      >
        <ArrowDown className="w-6 h-6 text-primary" aria-hidden="true" />
      </button>
    </section>
  );
};

export default Hero;
