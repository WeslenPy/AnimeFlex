import { AnimeProps } from "@/src/interfaces/anime";
import { SQLiteDatabase, openDatabaseSync, useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";

import * as historySchema from "@/src/controller/database/schemas/historySchema";
import * as animeSchema from "@/src/controller/database/schemas/animeSchema";
import * as favoritesSchema from "@/src/controller/database/schemas/favoritesSchema";
import * as thumbnailSchema from "@/src/controller/database/schemas/thumbnailSchema";
import { eq } from "drizzle-orm";



export class AnimeQuery{

    DATABASE_NAME="anime.db"

    expoDB = openDatabaseSync(this.DATABASE_NAME);
    db = drizzle(this.expoDB);
    


    getContext(){
        return this.expoDB
    }


    async animeAddNotExists(anime:AnimeProps){
        try{
            const context = this.getContext()
            const db = drizzle(context,{schema:animeSchema})

            const newRow = await db.insert(animeSchema.animeTable).values({
                video_id:parseInt(anime.video_id),
                anime_id:parseInt(anime.id),
                category_image:anime.category_image,
                category_name:anime.category_name,
                title:anime.title,
            })

            return  newRow
    

        }catch(error){

            console.log(error)
        }

    }


    async addSearch(text:string) {
        return {}
    }

    async addThumb(video_id:number,uri:string) {
        try{
            const context = this.getContext()
            const db = drizzle(context,{schema:thumbnailSchema})
        
            const response = await db.insert(thumbnailSchema.thumbTable).values({video_id:video_id,uri:uri})
            return response
            
        }catch(error){

            console.log(error)
        }
    }    
    
    async addFavorite(anime:AnimeProps) {
        try{
            await this.animeAddNotExists(anime)
    
            const context = this.getContext()
            const db = drizzle(context,{schema:favoritesSchema})
    
        
            const response = await db.insert(favoritesSchema.favoritesTable).values({anime_id:parseInt(anime.id)})
            return response
            
        }catch(error){

            console.log(error)
        }
    }   
    
    async getFavorite(anime:AnimeProps) {
        try{
            const context = this.getContext()
            const db = drizzle(context,{schema:favoritesSchema})
        
            const response = await db.select({id:favoritesSchema.favoritesTable.id}
                                                ).from(favoritesSchema.favoritesTable
                                                ).where(eq(favoritesSchema.favoritesTable.anime_id,parseInt(anime.id)))
            return response
            
        }catch(error){

            console.log(error)

            return null
        }
    }
    
    async getThumb(video_id:number) {
        try{
            const context = this.getContext()
            const db = drizzle(context,{schema:thumbnailSchema})
        
            const response = await db.select({uri:thumbnailSchema.thumbTable.uri}
                                                ).from(thumbnailSchema.thumbTable
                                                ).where(eq(thumbnailSchema.thumbTable.video_id,video_id))
            return response
            
        }catch(error){

            console.log(error)

            return null
        }
    }

    async removeFavorite(anime:AnimeProps) {
        try{
            const context = this.getContext()
            const db = drizzle(context,{schema:favoritesSchema})
    
            
            const response = await db.delete(favoritesSchema.favoritesTable).where(
                eq(favoritesSchema.favoritesTable.anime_id,parseInt(anime.id))
            ).execute()

            return response
    
            
        }catch(error){

            console.log(error)
        }
    }

    async removeHistory(anime:AnimeProps) {
            try{
                const context = this.getContext()
                const db = drizzle(context,{schema:historySchema})
        
                
                const response = await db.delete(historySchema.historyTable).where(
                    eq(historySchema.historyTable.anime_id,parseInt(anime.id))
                )

                return response
        
                
            }catch(error){

                console.log(error)
            }
        }


    async addHistory(anime:AnimeProps) {
        try{
            await this.animeAddNotExists(anime)
            const context = this.getContext()

            const db = drizzle(context,{schema:historySchema})
    
            const response = await db.insert(historySchema.historyTable).values({anime_id:parseInt(anime.id)})
            return response
    
            
        }catch(error){
            console.log(error)

        }



    }


    async getFullHistory(){
        try {
            const context = this.getContext()
            const db = drizzle(context,{schema:historySchema})
            const findMany = await db.select().from(historySchema.historyTable
                                                    ).leftJoin(animeSchema.animeTable, 
                                                        eq(historySchema.historyTable.anime_id, 
                                                        animeSchema.animeTable.anime_id)).execute()
            return findMany

        }catch(error){

            console.log(error)
        }
    }   
    
    async getFullFavorites(){
        try {
            const context = this.getContext()
            const db = drizzle(context,{schema:favoritesSchema})
            const findMany = await db.select().from(favoritesSchema.favoritesTable
                                                    ).leftJoin(animeSchema.animeTable, 
                                                        eq(favoritesSchema.favoritesTable.anime_id, 
                                                        animeSchema.animeTable.anime_id)).execute()
            return findMany

        }catch(error){

            console.log(error)
            return null
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