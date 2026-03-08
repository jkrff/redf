import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://postgres.woihfoxzxhbxwzkhyffn:hackathonproject@aws-1-us-east-1.pooler.supabase.com:5432/postgres",
  },
});