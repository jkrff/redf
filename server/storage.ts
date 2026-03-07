import { db } from "./db";
import {
  products,
  type CreateProductRequest,
  type ProductResponse
} from "@shared/schema";
import { eq, like } from "drizzle-orm";

export interface IStorage {
  getProducts(search?: string): Promise<ProductResponse[]>;
  getProduct(id: number): Promise<ProductResponse | undefined>;
  createProduct(product: CreateProductRequest): Promise<ProductResponse>;
}

export class DatabaseStorage implements IStorage {
  async getProducts(search?: string): Promise<ProductResponse[]> {
    if (search) {
      return await db.select().from(products).where(like(products.name, `%${search}%`));
    }
    return await db.select().from(products);
  }

  async getProduct(id: number): Promise<ProductResponse | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(product: CreateProductRequest): Promise<ProductResponse> {
    await db.insert(products).values(product);
    const [created] = await db.select().from(products)
      .where(eq(products.name, product.name))
      .limit(1);
    return created;
  }
}

export const storage = new DatabaseStorage();