import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const projects = [
{
      title: "Portfolio",
      description: "Moderne Portfolio mit Vite, TypeScript, React, shadcn-ui und Tailwind CSS",
      tags: ["Vite", "TypeScript", "React", "shadcn-ui", "Tailwind CSS"],
      image: "/Portfolio_project.webp",
      githubUrl: "https://github.com/txm0405/Portfolio",
      liveUrl: "https://four04.de"
      },
     {
      title: "Wetter-Dashboard",
      description: "Eine Wetter Dashboard Website. Entwickelt mit Vite, TypeScript, React, ESlint, Vitest und Tailwind CSS",
      tags: ["Vite", "TypeScript", "React", "ESlint", "Vitest", "Tailwind CSS"],
      image: "/wetter-dashboard.webp",
      githubUrl: "https://github.com/txm0405/Weather-Dashboard",
      liveUrl: "https://wetter.four04.de"
     }
    ];

  return (
    <section id="projects" className="py-24 px-4 bg-gradient-dark" aria-labelledby="projects-heading">
      <div className="container mx-auto max-w-6xl">
        <header className="text-center mb-16 animate-fade-in">
          <h2 id="projects-heading" className="text-4xl md:text-5xl font-bold mb-4">Projekte</h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full" aria-hidden="true"></div>
          <p className="text-muted-foreground mt-6 text-lg max-w-2xl mx-auto">
            Eine Auswahl meiner aktuellen Arbeiten und Projekte
          </p>
        </header>

        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <Card 
              key={project.title}
              className="group hover:border-primary/50 transition-all duration-300 hover:shadow-card overflow-hidden bg-card/50 backdrop-blur-sm animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              role="article"
            >
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={project.image} 
                  alt={`Screenshot des ${project.title} Projekts - Moderne Portfolio-Website mit Vite, TypeScript und React`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                  width="800"
                  height="450"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" aria-hidden="true"></div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-2xl">{project.title}</CardTitle>
                <CardDescription className="text-base">{project.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-primary/30 hover:bg-primary/10"
                    asChild
                  >
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`GitHub Repository von ${project.title} ansehen`}
                    >
                      <Github className="w-4 h-4 mr-2" aria-hidden="true" />
                      Code
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-primary/30 hover:bg-primary/10"
                    asChild
                  >
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`Live Demo von ${project.title} öffnen`}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
