import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const sql = neon(
  process.env.NEXT_PUBLIC_DATABASE_URL ||
    "postgresql://neondb_owner:4piLaGt0EAHN@ep-small-credit-a5u05jd4.us-east-2.aws.neon.tech/penny-wise?sslmode=require"
);
export const db = drizzle(sql, { schema });
