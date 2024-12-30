import {
  integer,
  numeric,
  pgTable,
  serial,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

// budget schema
export const Budgets = pgTable("budgets", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  amount: numeric("amount").notNull(),
  Icon: varchar("icon"),
  createdBy: varchar("createdBy").notNull(),
});

// income schema
export const Incomes = pgTable("incomes", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  amount: numeric("amount").notNull(),
  Icon: varchar("icon"),
  createdBy: varchar("createdBy").notNull(),
});

// expenses schema
export const expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  amount: numeric("amount").notNull(),
  budgetId: integer("budgetId").references(() => Budgets.id),
  createdBy: varchar("createdBy").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
