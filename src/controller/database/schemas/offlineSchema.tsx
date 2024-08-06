import { currentTime } from "@/src/utils/time";
import { sqliteTable, integer,text,numeric} from "drizzle-orm/sqlite-core";



export const  offlineTable = sqliteTable("offline",{
    id: integer("id").primaryKey().notNull().unique(),
    anime_id:integer("anime_id").unique().notNull(),
    path:text("path").notNull(),
    created_at:numeric("created_at").notNull().$defaultFn(()=>{return currentTime().toString()}),
    update_at:numeric("update_at").notNull().$defaultFn(()=>{return currentTime().toString()}),
})