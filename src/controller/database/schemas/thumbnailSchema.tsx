import { currentTime } from "@/src/utils/time";
import { sqliteTable, integer,text,numeric } from "drizzle-orm/sqlite-core";



export const  thumbTable = sqliteTable("thumb",{
    id: integer("id").primaryKey().notNull().unique(),
    video_id:integer("video_id").unique().notNull(),
    uri:text("uri").notNull(),
    created_at:numeric("created_at").notNull().$defaultFn(()=>{return currentTime().toString()}),
    update_at:numeric("update_at").notNull().$defaultFn(()=>{return currentTime().toString()}),
})