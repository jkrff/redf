import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  productType: text("product_type").notNull(), // e.g., 'pad', 'tampon', 'cup', 'liner'
  safetyScore: integer("safety_score").notNull(), // 0 to 100
  ingredients: jsonb("ingredients").notNull().$type<string[]>(),
  hazards: jsonb("hazards").notNull().$type<string[]>(),
  imageUrl: text("image_url"),
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true });

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export type CreateProductRequest = InsertProduct;
export type UpdateProductRequest = Partial<InsertProduct>;
export type ProductResponse = Product;
