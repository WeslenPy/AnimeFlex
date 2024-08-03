import { sqliteTable, integer,text } from "drizzle-orm/sqlite-core";



export const  offlineTable = sqliteTable("offline",{
    id: integer("id").primaryKey().notNull().unique(),
    anime_id:integer("anime_id").unique().notNull(),
    path:text("path").notNull(),

})