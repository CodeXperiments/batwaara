import { InferModel } from "drizzle-orm";
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: serial('id').primaryKey().notNull(),
    userId:text('user_id'),
    firstName: text('first_name').notNull(),
    lastName: text('last_name'),
    email:varchar('email',{length:256}).notNull(),
    profilePic: varchar('profile_pic_url',{length:256})
});

export type User = InferModel<typeof users>;
