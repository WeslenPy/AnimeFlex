import { View,Pressable,Text,Image } from 'react-native';
import manager from "@/src/controller/api/animetv/urls";
import { AnimeProps } from "@/src/interfaces/anime";
import openScreenAnime, { openScreenPlayer, openScreenPreview } from '@/src/utils/screen';
import { AnimeQuery } from '@/src/controller/storage/database';
import Preview from '../preview';
import { useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';


export function Card({anime}:{anime:AnimeProps}) {
    const bottomSheetRef = useRef<BottomSheet>(null);

    function showPreview(){
        console.log(bottomSheetRef.current)
        if (bottomSheetRef.current){
            console.log("run")
            bottomSheetRef.current.expand()
        }
    }


    async function addHistory(){
        const storage = new AnimeQuery()
        await storage.addHistory(anime)
    }


    let url = new manager.URLManager()
    return (
        <View className='flex-1'>

            <Pressable className='flex flex-col items-center' onLongPress={showPreview}  
                                                                onPress={() => {addHistory();anime.id?openScreenAnime(anime.id):openScreenPlayer(anime.video_id,"","")}}>
                                                                    
                    <View className='bg-slate-400 rounded-md'>
                        <Image className='w-44 h-80 rounded-md' progressiveRenderingEnabled={true}  source={{uri:url.router_image(anime.category_image)}} />
                    </View>
                    <Text className='text-white w-44  mt-2'>{anime.category_name || anime.title}</Text>

            </Pressable>
            <Preview reference={bottomSheetRef} animeId={anime.id}></Preview>
        </View>
    );
};