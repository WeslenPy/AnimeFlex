import { AnimeProps } from "@/src/interfaces/anime";
import { openDatabaseSync } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";

import * as historySchema from "@/src/controller/database/schemas/historySchema";
import * as animeSchema from "@/src/controller/database/schemas/animeSchema";
import * as favoritesSchema from "@/src/controller/database/schemas/favoritesSchema";
import * as thumbnailSchema from "@/src/controller/database/schemas/thumbnailSchema";
import * as downloadFileSchema from "@/src/controller/database/schemas/downloadFileSchema";
import { eq,and } from "drizzle-orm";
import { DownloadFile } from "@/src/interfaces/download";


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


    async addDownload(file:DownloadFile){
        try{
            const context = this.getContext()
            const db = drizzle(context,{schema:downloadFileSchema})
            
            const response = await db.insert(downloadFileSchema.downloadTable).values(file)
            return response

        }catch(error){
            console.log(error)
        }

    }
    
    async getDownload(video_id:number){
        const context = this.getContext()
        const db = drizzle(context,{schema:downloadFileSchema})
        
        const findFirst = await db.query.downloadTable.findFirst({where:eq(downloadFileSchema.downloadTable.video_id,video_id)})
        return findFirst

    }

    async getFullDownload(complete:boolean,pause:boolean){
        try {
            const context = this.getContext()
            const db = drizzle(context,{schema:downloadFileSchema})
            const findMany = await db.select().from(downloadFileSchema.downloadTable
                                            ).where(and(eq(downloadFileSchema.downloadTable.complete,complete),
                                                        eq(downloadFileSchema.downloadTable.pause,pause))).execute()
            return findMany

        }catch(error){

            console.log(error)
            return []
        }
    }   

    async updateDownload(data:any,video_id:number){
        try {
            const context = this.getContext()
            const db = drizzle(context,{schema:downloadFileSchema})

            const result = await db.update(downloadFileSchema.downloadTable)
            .set(data)
            .where(eq(downloadFileSchema.downloadTable.video_id, video_id))
            .returning({ updatedId: downloadFileSchema.downloadTable.id });


            return true

        }catch(error){
            return false
        }
    }

    async updateStartedDownload(started:boolean,video_id:number){

        return await this.updateDownload({started:started},video_id)
    }  
    async updateStatusDownload(pause:boolean,video_id:number){

        return await this.updateDownload({pause:pause},video_id)
    }

    async updateProgressDownload(progress:number,video_id:number){
        return await this.updateDownload({progress:progress},video_id)

    }

    async updateCompleteDownload(complete:boolean,video_id:number){
        return await this.updateDownload({complete:complete},video_id)

    }

    async updateURIDownload(uri:string,video_id:number){
        return await this.updateDownload({uri:uri},video_id)

    }

}