import { Mail, Github, Phone, Coffee, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import discordImg from "@/assets/discord.webp";
import whatsappImg from "@/assets/whatsapp.webp";
const Contact = () => {
  const { toast } = useToast();
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const cryptoAddresses = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      color: "text-orange-500"
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb4",
      color: "text-blue-500"
    },
    {
      name: "Solana",
      symbol: "SOL",
      address: "DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CDSXK",
      color: "text-purple-500"
    }
  ];

  const copyToClipboard = async (address: string, name: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      toast({
        title: "Adresse kopiert!",
        description: `${name} Adresse wurde in die Zwischenablage kopiert.`,
      });
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (err) {
      toast({
        title: "Fehler",
        description: "Adresse konnte nicht kopiert werden.",
        variant: "destructive",
      });
    }
  };

  const socialLinks = [
    { 
      icon: Github, 
      label: "GitHub", 
      href: "https://github.com/txm0405",
      ariaLabel: "GitHub Profil von Tom Hoffmann besuchen"
    },
    {
      image: discordImg,
      label: "Discord",
      href: "https://discord.com/users/1167472154015711392",
      ariaLabel: "Discord Profil von Tom Hoffmann besuchen"
    },
    {
      image: whatsappImg,
      label: "WhatsApp",
      href: "https://wa.me/4915170164900",
      ariaLabel: "WhatsApp Nachricht an Tom Hoffmann senden"
    },
    { 
      icon: Phone, 
      label: "Telefonnummer", 
      href: "tel:+4915170164900",
      ariaLabel: "Tom Hoffmann anrufen"
      }
  ];

  return (
    <section id="contact" className="py-24 px-4 bg-gradient-dark" aria-labelledby="contact-heading">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="animate-fade-in">
          <h2 id="contact-heading" className="text-4xl md:text-5xl font-bold mb-4">Lass uns zusammenarbeiten</h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full mb-8" aria-hidden="true"></div>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Hast du ein spannendes Projekt im Kopf? Ich freue mich darauf, von dir zu hören!
          </p>

          <nav aria-label="Social Media Links">
            <div className="flex justify-center gap-4 mb-12 flex-wrap">
              {socialLinks.map((social, index) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="lg"
                  className="border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  asChild
                >
                  <a 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                  >
                    {social.image ? (
                      <img src={social.image} alt={social.label} className="w-5 h-5 mr-2 inline-block" aria-hidden="true" />
                    ) : (
                      <social.icon className="w-5 h-5 mr-2" aria-hidden="true" />
                    )}
                    {social.label}
                  </a>
                </Button>
              ))}
            </div>
          </nav>

          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow text-lg px-8"
            asChild
          >
            <a 
              href="mailto:t.hoffmann@four04.de"
              aria-label="E-Mail an Tom Hoffmann schreiben"
            >
              <Mail className="w-5 h-5 mr-2" aria-hidden="true" />
              E-Mail senden
            </a>
          </Button>

          <div className="mt-16 pt-16 border-t border-border/30">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Coffee className="w-6 h-6 text-primary" aria-hidden="true" />
              <h3 className="text-2xl font-semibold">Spendier mir einen Kaffee</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Unterstütze meine Arbeit mit einer kleinen Krypto-Spende
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              {cryptoAddresses.map((crypto, index) => (
                <Button
                  key={crypto.symbol}
                  variant="outline"
                  size="lg"
                  onClick={() => copyToClipboard(crypto.address, crypto.name)}
                  className="border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all animate-scale-in"
                  style={{ animationDelay: `${(socialLinks.length + index) * 0.1}s` }}
                  aria-label={`${crypto.name} Adresse kopieren`}
                >
                  <span className={`font-semibold ${crypto.color} mr-2`}>{crypto.symbol}</span>
                  {copiedAddress === crypto.address ? (
                    <Check className="w-4 h-4 text-green-500" aria-hidden="true" />
                  ) : (
                    <Copy className="w-4 h-4" aria-hidden="true" />
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;



