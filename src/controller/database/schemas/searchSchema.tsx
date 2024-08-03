import { sqliteTable, integer,text } from "drizzle-orm/sqlite-core";



export const  searchTable = sqliteTable("search",{
    id: integer("id").primaryKey().notNull().unique(),
    searchable:text("searchable").notNull(),

})