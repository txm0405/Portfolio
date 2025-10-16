import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import DiscordPresence from "@/components/DiscordPresence";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Skip to main content for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
      >
        Zum Hauptinhalt springen
      </a>
      
      <Navigation />
      
      <main id="main-content">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <section id="discord" className="py-16 md:py-24 px-4" aria-labelledby="discord-heading">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12 animate-fade-in">
              <h2 id="discord-heading" className="text-4xl md:text-5xl font-bold mb-4">Discord Status</h2>
              <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full" aria-hidden="true"></div>
            </div>
            <DiscordPresence />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
