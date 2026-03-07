import { Link } from "wouter";
import { type Product } from "@shared/schema";
import { ScoreBadge } from "./ScoreBadge";
import { Droplet, Leaf } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
        className="group relative h-full flex flex-col bg-card rounded-3xl p-5 border border-border shadow-lg shadow-primary/5 hover-elevate transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20"
      >
        <div className="absolute top-5 right-5 z-10">
          <ScoreBadge score={product.safetyScore} size="sm" />
        </div>
        
        <div className="aspect-square w-full rounded-2xl bg-secondary/20 mb-6 overflow-hidden flex items-center justify-center relative">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-secondary/40 flex items-center justify-center text-secondary-foreground/50 group-hover:scale-110 transition-transform duration-500">
              <Droplet className="w-10 h-10" />
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col">
          <p className="text-xs font-bold text-primary tracking-wider uppercase mb-1.5">
            {product.brand}
          </p>
          <h3 className="text-lg font-bold text-foreground leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
          
          <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/50">
            <span className="text-sm font-medium text-muted-foreground capitalize flex items-center gap-1.5">
              <Leaf className="w-4 h-4 opacity-70" />
              {product.productType}
            </span>
            <span className="text-xs font-semibold text-foreground bg-muted px-2 py-1 rounded-md">
              {product.ingredients.length} Ingredients
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
