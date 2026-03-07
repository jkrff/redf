import { db } from "./db";
import {
  products,
  type CreateProductRequest,
  type ProductResponse
} from "@shared/schema";
import { eq, ilike } from "drizzle-orm";

export interface IStorage {
  getProducts(search?: string): Promise<ProductResponse[]>;
  getProduct(id: number): Promise<ProductResponse | undefined>;
  createProduct(product: CreateProductRequest): Promise<ProductResponse>;
}

export class DatabaseStorage implements IStorage {
  async getProducts(search?: string): Promise<ProductResponse[]> {
    if (search) {
      return await db.select().from(products).where(ilike(products.name, `%${search}%`));
    }
    return await db.select().from(products);
  }

  async getProduct(id: number): Promise<ProductResponse | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(product: CreateProductRequest): Promise<ProductResponse> {
    const [created] = await db.insert(products).values(product).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
