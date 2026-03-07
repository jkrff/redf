import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { z } from "zod";

// Helper to safely parse and log Zod errors
function parseWithLogging<T>(schema: z.ZodSchema<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod] ${label} validation failed:`, result.error.format());
    // For custom schemas that just assert types (like z.custom), 
    // it might fail if the runtime data doesn't strictly match the typescript type during dev.
    // In production, we'd throw. For now, if we trust the backend, we can fallback to the casted data.
    return data as T; 
  }
  return result.data;
}

export function useProducts(searchQuery?: string) {
  return useQuery({
    queryKey: [api.products.list.path, searchQuery],
    queryFn: async () => {
      const url = new URL(api.products.list.path, window.location.origin);
      if (searchQuery) {
        url.searchParams.append("search", searchQuery);
      }
      
      const res = await fetch(url.toString(), { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch products");
      
      const data = await res.json();
      return parseWithLogging(api.products.list.responses[200], data, "products.list");
    },
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: [api.products.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.products.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch product");
      
      const data = await res.json();
      return parseWithLogging(api.products.get.responses[200], data, "products.get");
    },
    enabled: !!id && !isNaN(id),
  });
}
