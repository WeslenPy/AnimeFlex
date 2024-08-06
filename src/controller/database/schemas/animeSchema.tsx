import { currentTime } from "@/src/utils/time";
import { sqliteTable, integer,text, numeric } from "drizzle-orm/sqlite-core";



export const  animeTable = sqliteTable("anime",{
    created_at:numeric("created_at").notNull().$defaultFn(()=>{return currentTime().toString()}),
    update_at:numeric("update_at").notNull().$defaultFn(()=>{return currentTime().toString()}), 
    id: integer("id").primaryKey().notNull().unique(),
    anime_id:integer("anime_id").unique().notNull(),
    category_image:text("image").notNull(),
    category_name:text("name").notNull(),
    video_id:integer("video_id"),
    title:text("title"),

})