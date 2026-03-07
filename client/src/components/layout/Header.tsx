import { ShieldCheck, Search } from "lucide-react";
import { Link } from "wouter";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 glass-card">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-3 group transition-transform active:scale-95"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground leading-none">
              Aura<span className="text-primary">Safe</span>
            </h1>
            <p className="text-xs text-muted-foreground font-medium">Menstrual Product Scanner</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Categories
          </Link>
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            About Standard
          </Link>
        </nav>
      </div>
    </header>
  );
}
