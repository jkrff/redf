import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.products.list.path, async (req, res) => {
    const search = req.query.search as string | undefined;
    const items = await storage.getProducts(search);
    res.json(items);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  });

  app.post(api.products.create.path, async (req, res) => {
    try {
      const input = api.products.create.input.parse(req.body);
      const product = await storage.createProduct(input);
      res.status(201).json(product);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed database
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingProducts = await storage.getProducts();
  if (existingProducts.length === 0) {
    await storage.createProduct({
      name: "Organic Cotton Tampons",
      brand: "NatureCare",
      productType: "tampon",
      safetyScore: 95,
      ingredients: ["100% Organic Cotton", "Cotton string"],
      hazards: [],
      imageUrl: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=300&h=300"
    });
    
    await storage.createProduct({
      name: "Scented Maxi Pads",
      brand: "FlowPro",
      productType: "pad",
      safetyScore: 40,
      ingredients: ["Rayon", "Polyester", "Fragrance", "Polyethylene"],
      hazards: ["Fragrance may cause irritation", "Potential exposure to dioxins from rayon bleaching"],
      imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5e4a8b79f?auto=format&fit=crop&q=80&w=300&h=300"
    });
    
    await storage.createProduct({
      name: "Reusable Menstrual Cup",
      brand: "EcoCycle",
      productType: "cup",
      safetyScore: 100,
      ingredients: ["100% Medical Grade Silicone"],
      hazards: [],
      imageUrl: "https://images.unsplash.com/photo-1629835848529-61f2214fa70c?auto=format&fit=crop&q=80&w=300&h=300"
    });

    await storage.createProduct({
      name: "Ultra Thin Panty Liners",
      brand: "DailyFresh",
      productType: "liner",
      safetyScore: 65,
      ingredients: ["Wood pulp", "Polyolefin", "Adhesive"],
      hazards: ["Adhesive may cause mild irritation"],
      imageUrl: "https://images.unsplash.com/photo-1502741384106-5653842cb1dd?auto=format&fit=crop&q=80&w=300&h=300"
    });
  }
}
