import { Coffee, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const BuyMeACoffee = () => {
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

  return (
    <section id="coffee" className="py-16 md:py-24 px-4" aria-labelledby="coffee-heading">
      <div className="container mx-auto max-w-4xl">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <Coffee className="w-8 h-8 text-primary" aria-hidden="true" />
            <h2 id="coffee-heading" className="text-4xl md:text-5xl font-bold">Spendier mir einen Kaffee</h2>
          </div>
          <p className="text-muted-foreground mt-4">
            Unterstütze meine Arbeit mit einer kleinen Krypto-Spende
          </p>
        </header>

        <div className="space-y-4 max-w-2xl mx-auto">
          {cryptoAddresses.map((crypto, index) => (
            <article
              key={crypto.symbol}
              className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`font-semibold ${crypto.color}`}>{crypto.name}</span>
                    <span className="text-xs text-muted-foreground">({crypto.symbol})</span>
                  </div>
                  <code className="text-xs sm:text-sm text-muted-foreground break-all">
                    {crypto.address}
                  </code>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(crypto.address, crypto.name)}
                  aria-label={`${crypto.name} Adresse kopieren`}
                  className="flex-shrink-0"
                >
                  {copiedAddress === crypto.address ? (
                    <Check className="w-4 h-4 text-green-500" aria-hidden="true" />
                  ) : (
                    <Copy className="w-4 h-4" aria-hidden="true" />
                  )}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuyMeACoffee;
