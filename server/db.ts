import { and, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { AccountDeletionRequest, HanaStudentMemory, InsertHanaStudentMemory, InsertOpportunity, InsertUser, Opportunity, accountDeletionRequests, hanaStudentMemory, opportunities, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getHanaStudentMemory(userId: number): Promise<HanaStudentMemory | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db.select().from(hanaStudentMemory).where(eq(hanaStudentMemory.userId, userId)).limit(1);
  return rows[0];
}

export async function upsertHanaStudentMemory(input: Omit<InsertHanaStudentMemory, "id" | "createdAt" | "updatedAt">): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.insert(hanaStudentMemory).values(input).onDuplicateKeyUpdate({
    set: { profile: input.profile, conversations: input.conversations, memoryEnabled: input.memoryEnabled },
  });
}

export async function listHanaConversations(userId: number): Promise<HanaStudentMemory["conversations"]> {
  const memory = await getHanaStudentMemory(userId);
  return memory?.conversations ?? [];
}

/** Clear only user-visible chat history; profile and learning progress remain intact. */
export async function clearHanaConversations(userId: number): Promise<void> {
  const memory = await getHanaStudentMemory(userId);
  if (!memory) return;
  await upsertHanaStudentMemory({
    userId,
    profile: memory.profile,
    conversations: [],
    memoryEnabled: memory.memoryEnabled,
  });
}

export function removeHanaConversation(conversations: HanaStudentMemory["conversations"], target: HanaStudentMemory["conversations"][number]): HanaStudentMemory["conversations"] {
  const index = conversations.findIndex((message) => message.role === target.role && message.text === target.text && message.createdAt === target.createdAt);
  if (index < 0) return conversations;
  return [...conversations.slice(0, index), ...conversations.slice(index + 1)];
}

export async function deleteHanaConversation(userId: number, target: HanaStudentMemory["conversations"][number]): Promise<void> {
  const memory = await getHanaStudentMemory(userId);
  if (!memory) return;
  const conversations = removeHanaConversation(memory.conversations, target);
  if (conversations === memory.conversations) return;
  await upsertHanaStudentMemory({ userId, profile: memory.profile, conversations, memoryEnabled: memory.memoryEnabled });
}

export async function listOpportunities(activeOnly = true): Promise<Opportunity[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(opportunities).where(activeOnly ? and(eq(opportunities.active, 1), eq(opportunities.verificationStatus, "verified")) : undefined).orderBy(desc(opportunities.deadlineAt), desc(opportunities.updatedAt));
}

export async function createOpportunity(input: Omit<InsertOpportunity, "id" | "createdAt" | "updatedAt">): Promise<Opportunity> {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.insert(opportunities).values(input);
  const rows = await db.select().from(opportunities).where(and(eq(opportunities.title, input.title), eq(opportunities.officialUrl, input.officialUrl))).orderBy(desc(opportunities.id)).limit(1);
  if (!rows[0]) throw new Error("Opportunity was not created");
  return rows[0];
}

export async function updateOpportunity(id: number, changes: Partial<Omit<InsertOpportunity, "id" | "createdAt" | "updatedAt" | "createdBy">>): Promise<Opportunity | undefined> {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.update(opportunities).set(changes).where(eq(opportunities.id, id));
  const rows = await db.select().from(opportunities).where(eq(opportunities.id, id)).limit(1);
  return rows[0];
}

export async function archiveOpportunity(id: number): Promise<Opportunity | undefined> {
  return updateOpportunity(id, { active: 0 });
}

export async function getOpportunity(id: number): Promise<Opportunity | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db.select().from(opportunities).where(eq(opportunities.id, id)).limit(1);
  return rows[0];
}

/** Delete the complete HANA-owned account scope without touching other users. */
export async function deleteUserAccount(userId: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.transaction(async (tx) => {
    await tx.delete(hanaStudentMemory).where(eq(hanaStudentMemory.userId, userId));
    await tx.delete(users).where(eq(users.id, userId));
  });
}

export async function createAccountDeletionRequest(email: string): Promise<AccountDeletionRequest | undefined> {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.insert(accountDeletionRequests).values({ email: email.trim().toLowerCase() });
  const rows = await db.select().from(accountDeletionRequests).where(eq(accountDeletionRequests.email, email.trim().toLowerCase())).orderBy(accountDeletionRequests.id).limit(1);
  return rows[0];
}
