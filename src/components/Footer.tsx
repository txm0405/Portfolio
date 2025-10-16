const Footer = () => {
  return (
    <footer className="py-8 px-4 border-t border-border" role="contentinfo">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Tom Hoffmann Portfolio. Alle Rechte vorbehalten.
          </p>
          <p className="text-muted-foreground text-sm">
            Entwickelt mit React, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
