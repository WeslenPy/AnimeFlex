import { currentTime } from "@/src/utils/time";
import { sqliteTable, integer,text,numeric } from "drizzle-orm/sqlite-core";



export const  searchTable = sqliteTable("search",{
    id: integer("id").primaryKey().notNull().unique(),
    searchable:text("searchable").notNull(),
    created_at:numeric("created_at").notNull().$defaultFn(()=>{return currentTime().toString()}),
    update_at:numeric("update_at").notNull().$defaultFn(()=>{return currentTime().toString()}),
})