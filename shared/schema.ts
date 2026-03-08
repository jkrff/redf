import { mysqlTable, text, serial, int, json } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = mysqlTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  productType: text("product_type").notNull(),
  safetyScore: int("safety_score").notNull(),
  ingredients: json("ingredients").notNull().$type<string[]>(),
  hazards: json("hazards").notNull().$type<string[]>(),
  imageUrl: text("image_url"),
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true });

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export type CreateProductRequest = InsertProduct;
export type UpdateProductRequest = Partial<InsertProduct>;
export type ProductResponse = Product;