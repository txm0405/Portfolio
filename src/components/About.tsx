import { Code2, Palette, Sparkles } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Code2,
      title: "Development",
      description: "Creative Tech Builder"
    },
    {
      icon: Palette,
      title: "Design",
      description: "Intuitive und ansprechende Benutzeroberflächen"
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description: "Kreative Lösungen für digitale Herausforderungen"
    }
  ];

  return (
    <section id="about" className="py-16 md:py-24 px-4" aria-labelledby="about-heading">
      <div className="container mx-auto max-w-6xl">
        <header className="text-center mb-16 animate-fade-in">
          <h2 id="about-heading" className="text-4xl md:text-5xl font-bold mb-4">Über Mich</h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full" aria-hidden="true"></div>
        </header>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
          <div className="animate-fade-in-up">
            <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed">
          Ich bin ein neugieriger Developer und Tech-Enthusiast mit einem Sinn fürs Praktische und Kreative.
          Meine Arbeit verbindet technisches Know-how mit kreativem Design, um digitale Projekte zu gestalten, die zuverlässig funktionieren und gleichzeitig ansprechend sind.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Mit Erfahrung in der Entwicklung moderner Web-Anwendungen und selbstgehosteter Systeme setze ich Ideen um, die sowohl praktisch als auch vielseitig einsetzbar sind, und lege Wert darauf, dass jedes Projekt einen klaren Zweck erfüllt.
            </p>
          </div>

          <div className="space-y-6" role="list">
            {features.map((feature, index) => (
              <article 
                key={feature.title}
                className="flex gap-4 p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-card animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                role="listitem"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
