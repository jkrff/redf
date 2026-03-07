import { useState } from "react";
import { Search, Loader2, Info } from "lucide-react";
import { motion } from "framer-motion";
import { useProducts } from "@/hooks/use-products";
import { Header } from "@/components/layout/Header";
import { ProductCard } from "@/components/products/ProductCard";

export function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  
  const { data: products, isLoading, isError } = useProducts(debouncedSearch);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDebouncedSearch(searchInput);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-20 pb-28 overflow-hidden">
          {/* Decorative background blobs */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[40%] rounded-full bg-secondary/30 blur-[100px] pointer-events-none" />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary/20 text-sm font-medium text-primary shadow-sm mb-6"
            >
              <Info className="w-4 h-4" />
              Empowering informed choices for your body
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground tracking-tight max-w-4xl mb-6"
            >
              Know What's In Your <br className="hidden md:block" />
              <span className="text-gradient">Feminine Care Products</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12"
            >
              Search thousands of pads, tampons, and liners to discover their safety scores, hidden ingredients, and potential health hazards.
            </motion.p>

            <motion.form 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onSubmit={handleSearchSubmit}
              className="w-full max-w-2xl relative"
            >
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                  <Search className="w-6 h-6" />
                </div>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="block w-full pl-16 pr-32 py-5 rounded-full bg-white border-2 border-white shadow-xl shadow-black/5 text-lg placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300"
                  placeholder="Search by brand, product name, or type..."
                />
                <div className="absolute inset-y-2 right-2">
                  <button
                    type="submit"
                    className="h-full px-8 rounded-full bg-primary text-primary-foreground font-bold shadow-md hover:bg-primary/90 hover:shadow-lg active:scale-95 transition-all duration-200"
                  >
                    Scan
                  </button>
                </div>
              </div>
            </motion.form>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-16 bg-muted/30 border-t border-border/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-bold text-foreground">
                {debouncedSearch ? `Results for "${debouncedSearch}"` : "Trending Products"}
              </h2>
              <span className="text-sm font-medium text-muted-foreground bg-white px-3 py-1 rounded-full border border-border shadow-sm">
                {products?.length || 0} items
              </span>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
                <p className="font-medium">Analyzing database...</p>
              </div>
            ) : isError ? (
              <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-8 text-center max-w-md mx-auto">
                <p className="text-destructive font-bold mb-2">Unable to load products</p>
                <p className="text-sm text-destructive-foreground/80">Please check your connection and try again.</p>
              </div>
            ) : products?.length === 0 ? (
              <div className="bg-white border border-border rounded-3xl p-16 text-center max-w-2xl mx-auto shadow-sm">
                <Search className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">No products found</h3>
                <p className="text-muted-foreground">
                  We couldn't find any items matching "{debouncedSearch}". Try using different keywords or checking the spelling.
                </p>
                <button 
                  onClick={() => {
                    setSearchInput("");
                    setDebouncedSearch("");
                  }}
                  className="mt-6 px-6 py-2.5 rounded-full bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-colors"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {products?.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
