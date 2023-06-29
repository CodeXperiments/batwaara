// lib imports
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL
const client = postgres(connectionString!,{max:10})

export const db = drizzle(client);
 
// push generated migrations to DB
const pushMigrations = async()=>{
    await migrate(db, { migrationsFolder: "migrations" });
}
pushMigrations();