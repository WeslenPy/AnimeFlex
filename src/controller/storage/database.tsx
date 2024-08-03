import { AnimeProps } from "@/src/interfaces/anime";
import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";

import * as historySchema from "@/src/controller/database/schemas/historySchema";
import * as animeSchema from "@/src/controller/database/schemas/animeSchema";
import * as favoritesSchema from "@/src/controller/database/schemas/favoritesSchema";
import { eq } from "drizzle-orm";

export class AnimeQuery{

    getContext(){
        return useSQLiteContext()
    }


    async animeAddNotExists(anime:AnimeProps){
        try{
            const context = this.getContext()
            const db = drizzle(context,{schema:animeSchema})
            const response = db.query.animeTable.findFirst({
                where:eq(animeSchema.animeTable.id,parseInt(anime.id))
            })
    
            if (!response){
                const response = await db.insert(animeSchema.animeTable).values({
                    video_id:parseInt(anime.video_id),
                    anime_id:parseInt(anime.id),
                    category_image:anime.category_image,
                    category_name:anime.category_name,
                    title:anime.title,
                })

                return  response
    
            }else{return response}

        }catch{}

    }


    async addSearch(text:string) {
        return {}
    }

    async addFavorite(anime:AnimeProps) {
        try{
            await this.animeAddNotExists(anime)
    
            const context = this.getContext()
            const db = drizzle(context,{schema:favoritesSchema})
    
            const find = await db.query.favoritesTable.findFirst({
                where:eq(favoritesSchema.favoritesTable.anime_id,parseInt(anime.id))
            })
            if (!find){
                const response = await db.insert(favoritesSchema.favoritesTable).values({anime_id:parseInt(anime.id)})
                return response
            }
    
            return find
            
        }catch{
            
        }
    }


    async addHistory(anime:AnimeProps) {
        try{
            await this.animeAddNotExists(anime)
            const context = this.getContext()

            const db = drizzle(context,{schema:historySchema})
    
            const find = await db.query.historyTable.findFirst({
                where:eq(historySchema.historyTable.anime_id,parseInt(anime.id))
            })
            if (!find){
                const response = await db.insert(historySchema.historyTable).values({anime_id:parseInt(anime.id)})
                return response
            }
    
            return find
            
        }catch(error){
            console.log(error)

        }



    }


    async getFullHistory(){
        try {
            const context = this.getContext()
            const db = drizzle(context,{schema:historySchema})
            const findMany = await db.select().from(historySchema.historyTable
                                                    ).rightJoin(animeSchema.animeTable, 
                                                        eq(historySchema.historyTable.anime_id, 
                                                        animeSchema.animeTable.anime_id)).execute()
            return findMany

        } catch (error) {
            
        }

    }   
    
    async getFullFavorites(){
        try {
            const context = this.getContext()
            const db = drizzle(context,{schema:favoritesSchema})
            const findMany = await db.query.favoritesTable.findMany()
            return findMany

        } catch (error) {
            
        }
    }


    async formatResult(result:any[]):Promise<AnimeProps[]>{
        const formattedAnime: AnimeProps[] = result.map(row => (
            {
              id: row.anime.anime_id,
              video_id: row.anime.video_id,
              category_name: row.anime.category_name,
              category_image: row.anime.category_image,
              title: row.anime.title?row.anime.title:"",
          }));

        return formattedAnime;
    }

}