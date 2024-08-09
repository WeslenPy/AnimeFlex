import { currentTime } from "@/src/utils/time";
import { sqliteTable, integer,text,numeric, } from "drizzle-orm/sqlite-core";



export const  downloadTable = sqliteTable("download",{
    id: integer("id").primaryKey().notNull().unique(),
    video_id:integer("video_id").unique().notNull(),
    anime_id:integer("anime_id").notNull(),
    title:text("title").notNull(),
    url:text("url").notNull(),
    uri:text("uri").default(""),
    data:text("data",{ mode: 'json' }),
    progress:numeric("progress").default("0").notNull(),
    started:integer("pause", {mode: 'boolean'}).default(false).notNull(),
    pause:integer("pause", {mode: 'boolean'}).default(false).notNull(),
    complete:integer("complete", {mode: 'boolean'}).default(false).notNull(),
    created_at:numeric("created_at").notNull().$defaultFn(()=>{return currentTime().toString()}),
    update_at:numeric("update_at").notNull().$defaultFn(()=>{return currentTime().toString()}),
})