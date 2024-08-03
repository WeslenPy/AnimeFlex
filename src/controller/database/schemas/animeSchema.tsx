import { sqliteTable, integer,text } from "drizzle-orm/sqlite-core";



export const  animeTable = sqliteTable("anime",{
    id: integer("id").primaryKey().notNull().unique(),
    anime_id:integer("anime_id").unique().notNull(),
    video_id:integer("video_id"),
    category_name:text("name").notNull(),
    category_image:text("image").notNull(),
    title:text("title"),

})