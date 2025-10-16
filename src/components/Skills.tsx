import { Badge } from "@/components/ui/badge";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue.js", "HTML/CSS"]
    },
    {
      title: "Tools & Others",
      skills: ["Git", "Docker", "Self-Hosting", "CasaOS", "Pi-hole"]
    }
  ];

  return (
    <section id="skills" className="py-16 md:py-24 px-4" aria-labelledby="skills-heading">
      <div className="container mx-auto max-w-6xl">
        <header className="text-center mb-16 animate-fade-in">
          <h2 id="skills-heading" className="text-4xl md:text-5xl font-bold mb-4">Skills & Technologien</h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full" aria-hidden="true"></div>
        </header>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {skillCategories.map((category, index) => (
            <article 
              key={category.title}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              role="region"
              aria-label={`${category.title} Technologien`}
            >
              <h3 className="text-2xl font-semibold mb-6 text-primary">{category.title}</h3>
              <ul className="flex flex-wrap gap-2" role="list">
                {category.skills.map(skill => (
                  <li key={skill}>
                    <Badge 
                      variant="secondary"
                      className="text-sm py-1.5 px-3 bg-secondary hover:bg-primary/20 transition-colors"
                    >
                      {skill}
                    </Badge>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
