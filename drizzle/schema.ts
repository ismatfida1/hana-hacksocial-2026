import { index, int, json, mysqlEnum, mysqlTable, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/mysql-core";

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
    subjects?: string[];
    upcomingSubjects?: string[];
    completedSubjects?: string[];
    career?: string;
    careerGoal?: string;
    currentJourney?: string;
    currentActiveStep?: string;
    activeStep?: string;
    demonstratedSkills?: string[];
    completedSkills?: string[];
    weakAreas?: string[];
    weaknesses?: string[];
    completedLearningSteps?: string[];
    stepNotes?: Record<string, string>;
    stepResources?: Record<string, string>;
    skills?: string[];
    progress?: string[];
    projects?: string[];
    projectRecords?: Array<{ id: string; title: string; skills: string[]; status: "locked" | "active" | "in_progress" | "complete"; milestones: Array<{ title: string; complete: boolean }>; linkedStep?: string; requiresReview?: boolean }>;
    projectSkills?: string[];
    githubProjects?: string[];
    portfolioProjects?: string[];
    competitions?: string[];
    opportunityOutcomes?: Array<{ opportunityTitle: string; status: "saved" | "applied" | "interview" | "accepted" | "rejected" | "completed"; updatedAt: string }>;
    careerReadiness?: string;
    preferredLearningTime?: string;
    availableStudyTime?: string;
    studyTime?: string;
    learningHistory?: string[];
    goals?: string[];
  }>().notNull(),
  conversations: json("conversations").$type<Array<{ role: "user" | "hana"; text: string; createdAt: string }>>().notNull(),
  memoryEnabled: int("memoryEnabled").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type HanaStudentMemory = typeof hanaStudentMemory.$inferSelect;
export type InsertHanaStudentMemory = typeof hanaStudentMemory.$inferInsert;

/** Admin-managed opportunities. Student-facing pages only show active records. */
export const opportunities = mysqlTable("opportunities", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  type: varchar("type", { length: 80 }).notNull(),
  detail: text("detail").notNull(),
  officialUrl: varchar("officialUrl", { length: 500 }).notNull(),
  deadlineAt: timestamp("deadlineAt"),
  eligibility: text("eligibility").notNull(),
  prizeDetails: text("prizeDetails"),
  location: varchar("location", { length: 200 }),
  requirements: text("requirements"),
  applicationSteps: text("applicationSteps"),
  submissionFormat: text("submissionFormat"),
  teamInfo: text("teamInfo"),
  difficulty: varchar("difficulty", { length: 80 }),
  verificationStatus: mysqlEnum("verificationStatus", ["unverified", "verified", "unreachable"]).default("unverified").notNull(),
  verifiedAt: timestamp("verifiedAt"),
  active: int("active").default(1).notNull(),
  createdBy: int("createdBy").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Opportunity = typeof opportunities.$inferSelect;
export type InsertOpportunity = typeof opportunities.$inferInsert;

/** Public deletion requests contain only a contact identifier and workflow metadata. */
export const accountDeletionRequests = mysqlTable("account_deletion_requests", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AccountDeletionRequest = typeof accountDeletionRequests.$inferSelect;
export type InsertAccountDeletionRequest = typeof accountDeletionRequests.$inferInsert;

/** Metadata for learner-selected Teach Hana files; bytes live in managed storage. */
export const hanaUploads = mysqlTable("hana_uploads", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  fileName: varchar("fileName", { length: 255 }).notNull(),
  mimeType: varchar("mimeType", { length: 120 }).notNull(),
  sizeBytes: int("sizeBytes").notNull(),
  storageKey: varchar("storageKey", { length: 500 }).notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type HanaUpload = typeof hanaUploads.$inferSelect;
export type InsertHanaUpload = typeof hanaUploads.$inferInsert;

export const hanaUploadsRelations = undefined;

export const hanaLearnerProfiles = mysqlTable("hana_learner_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  profile: json("profile").$type<Record<string, unknown>>().notNull(),
  version: int("version").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({ userIdIndex: index("hana_learner_profiles_user_id_idx").on(table.userId) }));

export type HanaLearnerProfile = typeof hanaLearnerProfiles.$inferSelect;
export type InsertHanaLearnerProfile = typeof hanaLearnerProfiles.$inferInsert;

export const hanaRoadmaps = mysqlTable("hana_roadmaps", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  profileVersion: int("profileVersion").notNull(),
  version: int("version").notNull(),
  status: mysqlEnum("status", ["active", "archived"]).default("active").notNull(),
  roadmap: json("roadmap").$type<Record<string, unknown>>().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({ userVersionUnique: uniqueIndex("hana_roadmaps_user_version_uq").on(table.userId, table.version), userStatusIndex: index("hana_roadmaps_user_status_idx").on(table.userId, table.status) }));

export type HanaRoadmap = typeof hanaRoadmaps.$inferSelect;
export type InsertHanaRoadmap = typeof hanaRoadmaps.$inferInsert;

export const hanaProgressEvents = mysqlTable("hana_progress_events", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  roadmapId: int("roadmapId").notNull(),
  eventType: varchar("eventType", { length: 80 }).notNull(),
  payload: json("payload").$type<Record<string, unknown>>().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({ userRoadmapIndex: index("hana_progress_events_user_roadmap_idx").on(table.userId, table.roadmapId), userCreatedIndex: index("hana_progress_events_user_created_idx").on(table.userId, table.createdAt) }));

export type HanaProgressEvent = typeof hanaProgressEvents.$inferSelect;
export type InsertHanaProgressEvent = typeof hanaProgressEvents.$inferInsert;
