import { useRoute } from "wouter";
import { useProduct } from "@/hooks/use-products";
import { Header } from "@/components/layout/Header";
import { CircularProgress } from "@/components/products/CircularProgress";
import { getScoreConfig } from "@/components/products/ScoreBadge";
import { 
  ArrowLeft, 
  AlertTriangle, 
  FlaskConical, 
  Leaf, 
  CheckCircle2,
  Droplet,
  Loader2,
  Share2
} from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const productId = params?.id ? parseInt(params.id, 10) : 0;
  
  const { data: product, isLoading, isError } = useProduct(productId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h2>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Link href="/" className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover-elevate">
            Return to Search
          </Link>
        </div>
      </div>
    );
  }

  const scoreConfig = getScoreConfig(product.safetyScore);
  const StatusIcon = scoreConfig.icon;
  const hasHazards = product.hazards && product.hazards.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pb-20">
        {/* Navigation Bar */}
        <div className="border-b border-border/50 bg-white/50 sticky top-20 z-40 backdrop-blur-md">
          <div className="container mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Results
            </Link>
            <button className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 pt-8 md:pt-12">
          {/* Top Hero Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-[2rem] p-6 md:p-10 shadow-xl shadow-black/5 border border-border mb-8 flex flex-col md:flex-row gap-8 lg:gap-12"
          >
            {/* Image Section */}
            <div className="w-full md:w-1/3 lg:w-1/4 aspect-square rounded-3xl bg-secondary/10 flex items-center justify-center overflow-hidden border border-secondary/20 p-6 relative">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
              ) : (
                <Droplet className="w-24 h-24 text-secondary-foreground/30" />
              )}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-foreground flex items-center gap-1.5 shadow-sm border border-border">
                <Leaf className="w-3.5 h-3.5 text-primary" />
                <span className="capitalize">{product.productType}</span>
              </div>
            </div>

            {/* Title & Score Section */}
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-sm font-bold tracking-widest text-primary uppercase mb-2">
                {product.brand}
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 leading-tight">
                {product.name}
              </h1>

              <div className="flex flex-wrap items-center gap-6 mt-auto bg-muted/40 p-6 rounded-3xl border border-border/50">
                <CircularProgress score={product.safetyScore} size={100} strokeWidth={8} />
                
                <div className="flex-1 min-w-[200px]">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold mb-2 ${scoreConfig.bg} ${scoreConfig.color} border ${scoreConfig.border}`}>
                    <StatusIcon className="w-4 h-4" />
                    {scoreConfig.label} Rating
                  </div>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    Based on independent analysis of {product.ingredients.length} ingredients against known health and safety databases.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Ingredients */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="bg-card rounded-3xl p-8 border border-border shadow-lg shadow-black/5">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <FlaskConical className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Ingredient List</h2>
                    <p className="text-sm text-muted-foreground">{product.ingredients.length} identified components</p>
                  </div>
                </div>
                
                {product.ingredients.length > 0 ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.ingredients.map((ingredient, i) => (
                      <li key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-foreground font-medium capitalize">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No ingredient data available for this product.
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right Column: Hazards */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-5 space-y-6"
            >
              <div className={`rounded-3xl p-8 border shadow-lg ${hasHazards ? 'bg-rose-50/50 border-rose-200 shadow-rose-900/5 dark:bg-rose-950/10 dark:border-rose-900/50' : 'bg-emerald-50/50 border-emerald-200 shadow-emerald-900/5 dark:bg-emerald-950/10 dark:border-emerald-900/50'}`}>
                <div className={`flex items-center gap-3 mb-6 pb-6 border-b ${hasHazards ? 'border-rose-200 dark:border-rose-900/50' : 'border-emerald-200 dark:border-emerald-900/50'}`}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${hasHazards ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-400' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400'}`}>
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Health Hazards</h2>
                    <p className="text-sm font-medium opacity-80">{hasHazards ? `${product.hazards.length} flagged concerns` : 'No known hazards flagged'}</p>
                  </div>
                </div>

                {hasHazards ? (
                  <ul className="space-y-4">
                    {product.hazards.map((hazard, i) => (
                      <li key={i} className="flex gap-4 p-4 bg-white dark:bg-black/20 rounded-2xl border border-rose-100 dark:border-rose-900/30">
                        <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-2" />
                        <span className="text-foreground font-medium leading-relaxed">{hazard}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <p className="text-emerald-800 dark:text-emerald-300 font-semibold max-w-xs">
                      Based on current data, no significant health hazards have been identified for this product's ingredients.
                    </p>
                  </div>
                )}
              </div>
              
              {/* Disclaimer Card */}
              <div className="bg-muted/50 rounded-2xl p-6 border border-border text-sm text-muted-foreground leading-relaxed">
                <strong>Disclaimer:</strong> The safety score and hazard information provided do not constitute medical advice. Consult with a professional regarding health concerns.
              </div>
            </motion.div>

          </div>
        </div>
      </main>
    </div>
  );
}
