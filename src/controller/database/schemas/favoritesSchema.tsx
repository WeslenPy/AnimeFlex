import { currentTime } from "@/src/utils/time";
import { sqliteTable, integer,text,numeric } from "drizzle-orm/sqlite-core";



export const  favoritesTable = sqliteTable("favorites",{
    id: integer("id").primaryKey().notNull().unique(),
    anime_id:integer("anime_id").unique().notNull(),
    created_at:numeric("created_at").notNull().$defaultFn(()=>{return currentTime().toString()}),
    update_at:numeric("update_at").notNull().$defaultFn(()=>{return currentTime().toString()}),
})