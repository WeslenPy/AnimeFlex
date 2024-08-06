import { View,Image,Pressable,Text,TouchableOpacity } from 'react-native';
import { AnimeProps } from "@/src/interfaces/anime";
import openScreenAnime from '@/src/utils/screen';
import manager from "@/src/controller/api/animetv/urls";
import { Feather,AntDesign } from '@expo/vector-icons';
import AnimeStorage from '@/src/controller/storage/manager';
import { AnimeQuery } from '@/src/controller/storage/database';
import { useEffect, useState } from 'react';

export default function Box({anime}:{anime:AnimeProps}) {
    let url = new manager.URLManager()
    
    return (
        <Pressable className='w-full flex flex-row m-6 mb-0 mt-0'  onPress={() => {openScreenAnime(anime.id);}}>
            <View className='bg-slate-400 rounded-md'>
                <Image className='w-32 h-40 rounded-lg' onProgress={(event)=>{}}  source={{uri:url.router_image(anime.category_image)}}   />
            </View>
            <View className='mx-5'>
                <Text className='text-white w-44  mt-2'>{anime.category_name}</Text>
            </View>
       </Pressable>
  );
}



export function BoxHistory({anime,state,setState,remove
                        }:{anime:AnimeProps,state:any,
                            setState:any,remove?:boolean}) {


    const [favorite,setFavorite] = useState(false)
    
    let url = new manager.URLManager()
    const storage = new AnimeQuery()


    function deleteItem(){
        removeItem()
        storage.removeHistory(anime)

        if(remove){
            storage.removeFavorite(anime)
        }

    }

    const removeItem = () => {
        const removedItem = state.filter((item:AnimeProps) => JSON.stringify(item) !== JSON.stringify(anime));
        setState(removedItem);
      };

    function addFavorite(){


        if (!favorite){
            storage.addFavorite(anime)
            setFavorite(true)

        }else{
            if(remove){
                removeItem()
            }

            storage.removeFavorite(anime)
            setFavorite(false)

        }

    }

    useEffect(()=>{
        async function getFav(){

            const result = await storage.getFavorite(anime)

            if (result && result.length>0){
                setFavorite(true)
            }else{setFavorite(false)}

        }

        getFav()

    },[])

    return (
        <Pressable className='flex-row p-2 m-2 rounded-lg mb-1'
             style={{backgroundColor:"rgba(255,255,255,0.2)"}}  onPress={() => {openScreenAnime(anime.id);}}>
            <View className='bg-slate-400 rounded-lg'>
                <Image  className='w-32 h-40 rounded-lg' 
                        onProgress={(event)=>{}}  
                        source={{uri:url.router_image(anime.category_image)}}   />

            </View>
            <View className='mx-2 flex-row justify-between flex-1'>
                <View className='mx-2'>
                    <Text className='text-white w-48  mt-2'>{anime.category_name}</Text>
                </View>
               
            </View>
            <View className='flex-row justify-end items-end gap-2 mb-3'>
                <TouchableOpacity onPressOut={addFavorite}>
                    {favorite? (
                        <AntDesign name="heart" size={24} color="white" />
                        ):(
                        <AntDesign name="hearto" size={24} color="white" />
                    )}

                </TouchableOpacity>

                {!remove && (

                    <TouchableOpacity onPressOut={deleteItem}>
                        <Feather name="trash" size={24} color="red" />
                    </TouchableOpacity>

                )}
            </View>
       </Pressable>
  );
}