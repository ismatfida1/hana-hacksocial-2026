import { int, json, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const hanaStudentMemory = mysqlTable("hana_student_memory", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  profile: json("profile").$type<{
    university?: string;
    degree?: string;
    department?: string;
    semester?: string;
    career?: string;
    skills?: string[];
    progress?: string[];
    projects?: string[];
    goals?: string[];
  }>().notNull(),
  conversations: json("conversations").$type<Array<{ role: "user" | "hana"; text: string; createdAt: string }>>().notNull(),
  memoryEnabled: int("memoryEnabled").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type HanaStudentMemory = typeof hanaStudentMemory.$inferSelect;
export type InsertHanaStudentMemory = typeof hanaStudentMemory.$inferInsert;