export default {
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url:
      process.env.DATABASE_URL ||
      "postgresql://neondb_owner:4piLaGt0EAHN@ep-small-credit-a5u05jd4.us-east-2.aws.neon.tech/penny-wise?sslmode=require",
  },
};
