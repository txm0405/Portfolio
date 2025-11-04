import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Über Mich", id: "about" },
    { label: "Projekte", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Kontakt", id: "contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border" aria-label="Hauptnavigation">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={() => scrollToSection("home")}
            className="text-xl font-bold text-primary hover:text-primary/80 transition-colors"
            aria-label="Zurück zur Startseite"
            type="button"
          >
            Tom Hoffmann
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-6" role="list">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                  type="button"
                  aria-label={`Navigiere zu ${item.label} Sektion`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div id="mobile-menu" className="md:hidden py-4 animate-fade-in">
            <ul className="flex flex-col gap-2" role="list">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-left px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all w-full"
                    type="button"
                    aria-label={`Navigiere zu ${item.label} Sektion`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
