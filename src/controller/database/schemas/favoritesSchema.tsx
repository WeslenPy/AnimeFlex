import { sqliteTable, integer,text } from "drizzle-orm/sqlite-core";



export const  favoritesTable = sqliteTable("favorites",{
    id: integer("id").primaryKey().notNull().unique(),
    anime_id:integer("anime_id").unique().notNull(),

})