import { Link } from "wouter";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 glass-card">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-3 group transition-transform active:scale-95"
        >

          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground leading-none">
              Red<span style={{ color: "#800000" }}>F</span>
            </h1>
            <p className="text-xs text-muted-foreground font-medium">Menstrual Product Scanner</p>
          </div>
        </Link>

      </div>
    </header>
  );
}