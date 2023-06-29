import { InferModel } from "drizzle-orm";
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';

export const users = pgTable('users', {
    id: serial('id').primaryKey().notNull(),
    fullName: text('full_name'),
    email:varchar('email',{length:256}).notNull(),
});

export type User = InferModel<typeof users>;
