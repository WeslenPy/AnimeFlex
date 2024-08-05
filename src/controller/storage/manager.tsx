import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Crypto from 'expo-crypto';
import { AnimeProps } from '@/src/interfaces/anime';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';


class Keys{

    history_key = "history"
}





class AnimeStorage extends Keys{



    async encode(key:string){
        const key_sha = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.MD5, key);
        return key_sha
    }


    async save(key:string,value:any):Promise<boolean>{
        const key_sha = await this.encode(key);
        await AsyncStorage.setItem(key_sha,JSON.stringify(value))


        return true;
    }

    async get(key:string):Promise<any>{
        const key_sha = await this.encode(key);
        let result:string| null =await AsyncStorage.getItem(key_sha)
        if(result){
            return JSON.parse(result)
        }
        return null
    }


    async update(key:string,append:any):Promise<Object>{

        let result =await this.get(key)

        let join = {...result,...append}
        await this.save(key,join)

        return join
        

    }

    async history(anime:AnimeProps):Promise<Object>{



        let result =await this.get(this.history_key)
        if (!result){
            let data = {[this.history_key]:[anime]}

            return await this.save(this.history_key,data)
        }
        
        const exists = result["history"].some((item:AnimeProps) => JSON.stringify(item) === JSON.stringify(anime));

        if(!exists){
            result["history"].push(anime)

        }

        await this.save(this.history_key,result)

        return result
        

    }

   async delete(anime:AnimeProps):Promise<Object>{

        let result =await this.get(this.history_key)
        if (!result){
           return {}
        }
        const removedItem = result["history"].filter((item:AnimeProps) => JSON.stringify(item) !== JSON.stringify(anime));

        result["history"]=removedItem

        await this.save(this.history_key,result)

        return result
        

    }



    async getProgress(videoId:string):Promise<{progress:Float}>{
       return await this.get(videoId); 
    }

    async setProgress(actualMilles:any,finishMilles:any,videoId:string):Promise<Object>{
        if (finishMilles === 0) return await this.save(videoId,{"progress":0,"positionActual":actualMilles}); 
        const progress = (actualMilles / finishMilles) * 100;
        return await this.save(videoId,{"progress":progress > 100 ? 100 : parseInt(progress.toFixed(2)),"positionActual":actualMilles}); 
    }






}


export default AnimeStorage;